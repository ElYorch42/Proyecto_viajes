
import { Component, Input } from '@angular/core';
import { FormularioInvitadosComponent } from './formulario-invitados/formulario-invitados.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../_servicio/cliente.service';
import { ComienzoViajeComponent } from '../comienzo-viaje/comienzo-viaje.component';
import { HermanosCVFDService } from '../_servicio/hermanos-cv-fd.service';
import { forkJoin, map, never } from 'rxjs';
import { AmadeusService } from '../_servicio/amadeus.service';
import { Destinos } from '../_modelo/Destinos';
import { DestinosService } from '../_servicio/destinos.service';
import { AmadeusViaje } from '../_modelo/AmadeusViaje';
import { AmadeusHoteles } from '../_modelo/AmadeusHoteles';
import { AmadeusDatos } from '../_modelo/AmadeusDatos';

@Component({
  selector: 'app-formulario-datos',
  standalone: true,
  imports: [ReactiveFormsModule, ComienzoViajeComponent, FormularioInvitadosComponent, NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './formulario-datos.component.html',
  styleUrl: './formulario-datos.component.css'
})
export class FormularioDatosComponent {

  continenteAleatorio: string = "";
  aeSalida: string = "";
  
  destino: Destinos = {
    id: 0,
    codigo_ciudad: '',
    aeropuerto: '',
    nombre: '',
    tipoLocalidad: '',
    id_pais: 0
  }

  formulario: FormGroup;

  formArrayData: FormArray = new FormArray([] as FormControl[]);

  constructor(private hermano: HermanosCVFDService, private http: HttpClient, private fb: FormBuilder,
    private router: Router, private amadeusServicio: AmadeusService, private destinoServicio: DestinosService,
    private hermanos: HermanosCVFDService) {
    this.formulario = this.fb.group({
      ratings: ['', Validators.required],
      fechaSalida: ['', Validators.required],
      fechaLlegada: ['', Validators.required]
    })
  }

  childreciever(form: FormArray): void {
    this.formArrayData = form;
    console.log('FormArray recibido del hijo:', this.formArrayData.value);
  }

  ngOnInit(): void {
    this.hermano.currentData.subscribe(data => this.continenteAleatorio = data);
    this.hermano.currentData2.subscribe(data => this.aeSalida = data);
    this.hermano.currentData.subscribe()
    if (this.continenteAleatorio == "default data") {
      this.router.navigate(["inicio"])
    }

    this.destinoServicio.consultaPorContinenteAleatoria(this.continenteAleatorio).subscribe(datos => {
      
      this.destino = {
        id: datos.id,
        codigo_ciudad: datos.codigo_ciudad,
        aeropuerto: datos.aeropuerto,
        nombre: datos.nombre,
        tipoLocalidad: datos.tipoLocalidad,
        id_pais: datos.id_pais
      };
      //this.destino = datos;
    });

    const today = new Date().toISOString().split('T')[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const manana = tomorrow.toISOString().split('T')[0];

    document.getElementById('fechaSalida')?.setAttribute('min', today);
    document.getElementById('fechaLlegada')?.setAttribute('min', manana);
  }

  mirar() {
    let numMaletas=0;
    
    for (let index = 0; index < this.formArrayData.length; index++) {
      numMaletas += Number(this.formArrayData.at(index).get("maletas")?.value);
    }

    let amadeusViaje: AmadeusViaje = {
      originLocationCode: 'MAD',
      destinationLocationCode: this.destino.codigo_ciudad,
      departureDate: this.formulario.controls["fechaSalida"].value,
      returnDate: this.formulario.controls["fechaLlegada"].value,
      adults: this.formArrayData.length,
      nonStop: false
    };
    let amadeusHoteles: AmadeusHoteles = {
      cityCode: this.destino.codigo_ciudad,
      ratings: parseInt(this.formulario.controls["ratings"].value),
      adults: this.formArrayData.length,

      nombre_hotel: '',
      id_hotel: '',
      latitud: '',
      lengitud: '',
      precio: 0,

      actividad1: '',
      actividad2: '',
      actividad3: '',
      precio_actividades: 0
    };

    forkJoin({
      viaje: this.amadeusServicio.obtenerviajes(amadeusViaje).pipe(map(data => parseFloat(data))),
      hoteles: this.amadeusServicio.obtenerHoteles(amadeusHoteles)
    }).subscribe(({ viaje, hoteles }) => {
      let preciodelViaje = viaje;
      let amadeusHoteles = hoteles;

      let amadeusDatos: AmadeusDatos = {
        destino:this.destino.id,
        originLocationCode: this.aeSalida,
        destinationLocationCode: this.destino.codigo_ciudad,
        departureDate: this.formulario.controls["fechaSalida"].value,
        returnDate: this.formulario.controls["fechaLlegada"].value,
        adults: this.formArrayData.length,
        nonStop: false,
        precioViaje: preciodelViaje,

        ratings: parseInt(this.formulario.controls["ratings"].value),

        nombre_hotel: amadeusHoteles.nombre_hotel,
        id_hotel: amadeusHoteles.id_hotel,
        latitud: amadeusHoteles.latitud,
        lengitud: amadeusHoteles.lengitud,
        precioHotel: amadeusHoteles.precio,

        actividad1: amadeusHoteles.actividad1,
        actividad2: amadeusHoteles.actividad2,
        actividad3: amadeusHoteles.actividad3,
        precio_actividades: amadeusHoteles.precio_actividades,
        maletas: numMaletas
      };

      this.hermanos.changeDataAmadeus(amadeusDatos);
      this.hermanos.changeDataInvitados(this.formArrayData);
      this.router.navigate(['/pago'])
    }, (error) => {
      if (error.status === 500) {

        let mensaje: string = "No hay hoteles de " + this.formulario.controls['ratings'].value + " estrellas en la fecha seleccionada";

        alert(mensaje);
      } else {

        alert('Ha ocurrido un error. Por favor, inténtalo más tarde.');
      }
    });
  }
}