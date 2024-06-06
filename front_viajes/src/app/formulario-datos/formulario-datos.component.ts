
import { Component, Input } from '@angular/core';
import { FormularioInvitadosComponent } from './formulario-invitados/formulario-invitados.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../_servicio/cliente.service';
import { ComienzoViajeComponent } from '../comienzo-viaje/comienzo-viaje.component';
import { HermanosCVFDService } from '../_servicio/hermanos-cv-fd.service';
import { never } from 'rxjs';

@Component({
  selector: 'app-formulario-datos',
  standalone: true,
  imports: [ReactiveFormsModule,ComienzoViajeComponent,FormularioInvitadosComponent,NavbarComponent,FooterComponent,ReactiveFormsModule],
  templateUrl: './formulario-datos.component.html',
  styleUrl: './formulario-datos.component.css'
})
export class FormularioDatosComponent {

   

   destinoAleatorio: string = "";


  formulario: FormGroup;

  formArrayData: FormArray = new FormArray([] as FormControl[]);

  constructor(private hermano:HermanosCVFDService,private http: HttpClient, private fb: FormBuilder, private router: Router, private servicio: ClienteService) {
    this.formulario = this.fb.group({
      hotel:new FormControl(''),
      fechaSalida:new FormControl(''),
      fechaLlegada:new FormControl('')
      

    })
  }


  childreciever(form:FormArray):void{
    this.formArrayData = form;
    console.log('FormArray recibido del hijo:', this.formArrayData.value);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.hermano.currentData.subscribe(data => this.destinoAleatorio = data);
    console.log(this.destinoAleatorio);


    document.addEventListener('DOMContentLoaded', function() {
      const today = new Date().toISOString().split('T')[0];
      
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const manana = tomorrow.toISOString().split('T')[0];
      document.getElementById('fechaSalida')?.setAttribute('min', today);
      document.getElementById('fechaLlegada')?.setAttribute('min', manana);
  });
   
  }

  

  mirar(){
    console.log(  this.formulario.controls["hotel"].value);
    console.log(  this.formulario.controls["fechaSalida"].value);
    console.log(  this.formulario.controls["fechaLlegada"].value);
  }

}
