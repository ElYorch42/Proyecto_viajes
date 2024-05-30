import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInRequest } from '../_modelo/signin_request';
import { JwtAuthenticationResponse } from '../_modelo/JwtAuthenticationResponse';
import { entorno } from '../_environment/entorno';
import { ClienteService } from '../_servicio/cliente.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FooterComponent,RouterLink,ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {


  formulario:FormGroup;


  iniciodiv:boolean = false;

  respuesta:JwtAuthenticationResponse = {
    token:""
  };

  
  loginUrl = "http://localhost:8080/api/v1/signin";

  constructor( private renderer: Renderer2,private http:HttpClient,private fb: FormBuilder , private router:Router,private servicio:ClienteService) { 
    this.formulario = this.fb.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      
      

    })  
  }


  buscarInicio() {
    this.respuesta.token = "";
    let datos: SignInRequest = {
      email: this.formulario.value['email'],
      password: this.formulario.value['password']
    
    };
  
    this.servicio.autenticar(datos)
      .subscribe(
        (data) => {
          console.log("tokenInic-> " + data.token);
          sessionStorage.setItem(entorno.TOKEN_SESSION, data.token)
          this.iniciodiv = true;
          setTimeout(() => {
            this.router.navigate(['/inicio'])
          }, 3000);
        },
        (error) => {
          if (error.status === 500) {
        
           let mensaje: string = "Error en el correo o la contraseña, por favor revisa tus credenciales";

         
           const mensajeDiv = document.getElementById('mensajeDiv');
           if (mensajeDiv) {
             mensajeDiv.innerText = mensaje;
           }
          } else {
            
            alert('Ha ocurrido un error. Por favor, inténtalo más tarde.');
          }
        }
      );
  }
  
  

}
