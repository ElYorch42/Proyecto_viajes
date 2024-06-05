import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { entorno } from '../../_environment/entorno';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavbarComponent } from '../../navbar/navbar.component'; 
import { FooterComponent } from '../../footer/footer.component'; 
import { ClienteService } from '../../_servicio/cliente.service'; 
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Client } from 'auth0'; 
import { MostrarViajesComponent } from '../../perfilusuario/mostrar-viajes/mostrar-viajes.component'; 


@Component({
  selector: 'app-formulario-anfitrion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-anfitrion.component.html',
  styleUrl: './formulario-anfitrion.component.css'
})
export class FormularioAnfitrionComponent {

  formulario: FormGroup;
  redirigir: boolean = false;
  imagen:string = "";
  emaildesc:string = "";
  constructor(private http: HttpClient, private fb: FormBuilder,private route:Router ,private servicio: ClienteService,private jwtHelper:JwtHelperService) {
    this.formulario = this.fb.group({
      nombre: [""],
      dni: [""],
      direccion: [""],
      comunidad: [""],
      codigo_postal: [""],
      ciudad: [""]

    })
  }

  ngOnInit(): void {

    
    let token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    console.log("token2-> " + token)
    let tokenDecodificado = token !== null ? this.jwtHelper.decodeToken(token) : null;

    if (token != null) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.servicio.cerrarSesion();
        this.route.navigate(['/inicio_sesion']);
      }
    }

    if (tokenDecodificado != null) {
      this.emaildesc = tokenDecodificado.sub;
    }
    console.log("email: " + this.emaildesc);

    this.servicio.listarPorEmail(this.emaildesc).subscribe((data)=> {
      this.formulario = new FormGroup({
        'nombre': new FormControl(data.dni),
        'dni': new FormControl(data.nombre),
        'direccion': new FormControl(data.direccion),
        'comunidad': new FormControl(data.ciudad),
        'codigo_postal': new FormControl(data.comunidad),
        'ciudad': new FormControl(data.codigoPostal)

      });

    
    })


  }



}
