import { Component } from '@angular/core';
import { Invitado } from '../../_modelo/Invitado';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../_servicio/cliente.service';
import { FormularioAnfitrionComponent } from '../formulario-anfitrion/formulario-anfitrion.component';

@Component({
  selector: 'app-formulario-invitados',
  standalone: true,
  imports: [ReactiveFormsModule, FormularioAnfitrionComponent],
  templateUrl: './formulario-invitados.component.html',
  styleUrl: './formulario-invitados.component.css'
})
export class FormularioInvitadosComponent {



  formulario: FormGroup;



  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private servicio: ClienteService) {
    this.formulario = this.fb.group({
      arrayForm: this.fb.array([])

    })
  }


  datos(): FormArray {
    return this.formulario.get("arrayForm") as FormArray
  }

  addDatos() {
    const datos = this.fb.group({
      nombre: new FormControl(''),
      dni: new FormControl(''),
      direccion: new FormControl(''),
      comunidad: new FormControl(''),
      codigo_postal: new FormControl(''),
      ciudad: new FormControl(''),
      maletas: new FormControl('')

    })
    this.datos().push(datos)

  }

delete(index:number){
  this.datos().removeAt(index)
}


consolelog(){
  console.log(this.datos().value)
}


  

  


}
