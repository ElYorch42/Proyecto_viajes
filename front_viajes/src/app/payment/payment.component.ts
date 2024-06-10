import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StripeElements, StripeCardElement, StripeCardElementOptions, Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../_servicio/payment-service.service';
import { email } from '../_modelo/email';
import { EmailService } from '../_servicio/email.service';
import { ClienteService } from '../_servicio/cliente.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { entorno } from '../_environment/entorno';
import { AmadeusDatos } from '../_modelo/AmadeusDatos';
import { HermanosCVFDService } from '../_servicio/hermanos-cv-fd.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  //Variables de la api


  datosViaje: AmadeusDatos = {
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    returnDate: '',
    adults: 0,
    nonStop: true,
    precioViaje: 0,

    ratings: 0,

    nombre_hotel: '',
    id_hotel: '',
    latitud: '',
    lengitud: '',
    precioHotel: 0,

    actividad1: '',
    actividad2: '',
    actividad3: '',
    precio_actividades: 0
  }


  paymentForm: FormGroup;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  stripe: Stripe | null = null;
  clientSecret: string = '';
  //Variables de la informacion del usuario
  nombre: string = "";
  token: any = "";
  email: string = "";
  //Constructor






  constructor(private hermano: HermanosCVFDService, private paymentService: PaymentService, private fb: FormBuilder, private emailService: EmailService, private service: ClienteService, public jwtHelper: JwtHelperService, private router: Router) {
    this.paymentForm = this.fb.group({
      amount: [500]
    });
  }




  async ngOnInit() {

    this.hermano.currentDataAmadeus.subscribe((data) => {

      this.datosViaje = data;


    })

    console.log(this.datosViaje);

   

    console.log( this.calcularPrecio());

    //Implementacion de la api 
    this.stripe = await loadStripe('pk_test_51PM5FeRvfQwpBftnSmANSdvNfNEq73nbidnLsSadel1mtZVeIG4lDldegGPWBT4k2tf4CwEc2S3YecCVwBCiCdzs00GXjBBqbO');
    if (this.stripe) {
      this.elements = this.stripe.elements();
      const cardStyle = {
        style: {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            },
            ':-webkit-autofill': {
              color: '#fce883'
            },
            '::selection': {
              color: '#fce883',
              backgroundColor: '#ff7e5f'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
      };

      this.card = this.elements.create('card', cardStyle);
      this.card.mount('#card-element');
    } else {
      console.error('Stripe failed to initialize.');
    }
    //Desencripto el token
    this.token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    console.log("token-> " + this.token)
    let emaildesc;
    let tokenDecodificado = this.token !== null ? this.jwtHelper.decodeToken(this.token) : null;

    if (this.token != null) {
      if (this.jwtHelper.isTokenExpired(this.token)) {
        this.service.cerrarSesion();
        this.router.navigate(['/inicio_sesion']);
      }
      //Si el token esta desencriptado sacamos el correo y con el correo recojemos el resto de datos  
      if (tokenDecodificado != null) {
        emaildesc = tokenDecodificado.sub;
      }

      if (tokenDecodificado) {
        this.service.listarPorEmail(emaildesc).subscribe(
          data => {
            this.nombre = data.nombre;
            this.email = data.email;
          },
          error => {
            console.error('Error al obtener el contenido', error);
          }
        );
      }

    }
  }

  calcularTotal(){
    return this.calcularPrecio() + this.datosViaje.precioViaje + (this.datosViaje.precio_actividades*this.datosViaje.adults);
  }
  async submitPayment() {
    //Metodo que realiza el pago
    const amount = this.calcularTotal();
    if (amount) {
      this.paymentService.createPaymentIntent(amount).subscribe(async (data) => {
        this.clientSecret = data.clientSecret;
        if (this.stripe && this.card) {
          const result = await this.stripe.confirmCardPayment(this.clientSecret, {
            payment_method: {
              card: this.card,
            },
          });

          if (result.error) {
            console.error(result.error.message);
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              //Si el pago es correcto te avisa por consola y te manda un correo de confirmacion
              console.log('Payment successful!');
              //Metodo para enviar correos
              let e: email = {
                to: this.email,
                subject: "Confirmacion de reserva",
                text: "todo bien",
                name: this.nombre
              }
              this.emailService.sendEmailConfirmacion(e).subscribe(
                response => {
                  console.log('Correo enviado', response);
                },
                error => {
                  console.error('Error al enviar el correo', error);
                }
              );
              //Meter metodo insercion datos

            }
          }
        } else {
          console.error('Stripe or card is not initialized.');
        }
      }, error => {
        console.error('Error creating payment intent:', error);
      });
    } else {
      console.error('Amount is not defined.');
    }

  }

  calcularPrecio() {

      let inicio:Date = new Date(this.datosViaje.departureDate);

      let vuelta:Date = new Date(this.datosViaje.returnDate);


      let dias =  (((vuelta.getTime() - inicio.getTime())/86400000)-1)*this.datosViaje.adults;

     

      


    return this.datosViaje.precioHotel * dias;
  }

}






