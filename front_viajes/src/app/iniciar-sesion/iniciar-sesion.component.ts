import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FooterComponent,RouterLink,ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  formulario:FormGroup;

  
  arraytemporal = [{
    email: "test@test.com",
    password: "1234"
  }];

  constructor( private fb: FormBuilder , private router:Router) { 
    this.formulario = this.fb.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      

    })
   
  }
  buscarInicio() {
    let encontrado = false; // Variable para rastrear si se encontró el usuario
  
    for (let i = 0; i < this.arraytemporal.length; i++) {
      if (
        this.formulario.controls['email'].value === this.arraytemporal[i].email &&
        this.formulario.controls['password'].value === this.arraytemporal[i].password
      ) {
        encontrado = true; // Cambia el estado a true si se encontró el usuario
        break; // Sale del bucle una vez que se encontró el usuario
      }
    }
  
    if (encontrado) {
      this.router.navigateByUrl('/inicio');
    } else {
      alert("Usuario no encontrado");
    }
  }
  

}
