import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SignInRequest } from '../_modelo/signin_request';
import { JwtAuthenticationResponse } from '../_modelo/JwtAuthenticationResponse';
import { entorno } from '../_environment/entorno';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  

  constructor(private http: HttpClient, private router: Router) { }

  autenticar(datos: SignInRequest) {
    return this.http.post<JwtAuthenticationResponse>
      (`${entorno.HOSTNAME}/auth/signin`, datos)
  }

  estalogeado() {
    let token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    return token != null;
  }
  
  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['login']);

  }
}
