import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Viajes } from '../_modelo/Viajes';
import { ViajesService } from '../_servicio/viajes.service';
import { Invitado } from '../_modelo/Invitado';
import { InvitadosService } from '../_servicio/invitados.service';

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
    precio_actividades: 0,
    maletas:0,
    destino: 0,
  }


  paymentForm: FormGroup;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  stripe: Stripe | null = null;
  clientSecret: string = '';
  viaje:Viajes | null = null;
  id_viaje:number=0;
  formArrayData: FormArray = new FormArray([] as FormControl[]);
  //Variables de la informacion del usuario
  nombre: string = "";
  token: any = "";
  email: string = "";
  id_cliente:number = 0;
  //Constructor






  constructor(private hermano: HermanosCVFDService,private invitadoS:InvitadosService,private viajesS: ViajesService, private paymentService: PaymentService, private fb: FormBuilder, private emailService: EmailService, private service: ClienteService, public jwtHelper: JwtHelperService, private router: Router) {
    this.paymentForm = this.fb.group({
      amount: [500]
    });
  }




  async ngOnInit() {
    this.hermano.currentDataInvitados.subscribe((data) => { 
      this.formArrayData = data
    });
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
            this.id_cliente=data.id;
            console.log(this.id_cliente);
          },
          error => {
            console.error('Error al obtener el contenido', error);
          }
        );
      }

    }
  }

  calcularTotal(){
    return (this.calcularPrecio() + this.datosViaje.precioViaje + (this.datosViaje.precio_actividades*this.datosViaje.adults)+(this.datosViaje.maletas*30)).toFixed(2);
  }
  async submitPayment() {
    //Metodo que realiza el pago
    const amount = Number(this.calcularTotal());
    console.log(amount);
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
              let viaje={
                id:0,
                id_cliente:this.id_cliente,
                precio: Number(this.calcularTotal()),
                tipocalidad:'Ciudad',
                fecha_inicio: this.datosViaje.departureDate,
                fecha_fin: this.datosViaje.returnDate,
                id_destino:this.datosViaje.destino,
                actividad1: this.datosViaje.actividad1,
                actividad2: this.datosViaje.actividad2,
                actividad3: this.datosViaje.actividad3,
                nombre_hotel:this.datosViaje.nombre_hotel,
                id_hotel:this.datosViaje.id_hotel,
                latitud:Number(this.datosViaje.latitud),
                lengitud:Number(this.datosViaje.lengitud)
              }
              this.viajesS.insertar(viaje).subscribe(() =>{})
              this.viajesS.listarViajesInsercion(this.email).subscribe((data)=>{
                this.id_viaje=data.id;
              })
              if(this.formArrayData,length>0){
              for(let i= 1;this.formArrayData.length>i;i++){
                let invitado:Invitado ={
                  id: 0,
                  nombre: this.formArrayData.at(i).get('nombre')?.value,
                  dni: this.formArrayData.at(i).get('dni')?.value,
                  direccion: this.formArrayData.at(i).get('direccion')?.value,
                  ciudad: this.formArrayData.at(i).get('ciudad')?.value,
                  comunidad: this.formArrayData.at(i).get('comunidad')?.value,
                  codigoPostal: this.formArrayData.at(i).get('codigoPostal')?.value,
                  id_viaje: this.id_viaje
                }
                this.invitadoS.insertar(invitado).subscribe(()=>{})
              }
            }

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






