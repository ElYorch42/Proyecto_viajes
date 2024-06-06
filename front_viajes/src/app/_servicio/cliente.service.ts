import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { Cliente } from '../_modelo/Cliente';
import { JwtAuthenticationResponse } from '../_modelo/JwtAuthenticationResponse';
import { entorno } from '../_environment/entorno';
import { SignInRequest } from '../_modelo/signin_request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string =`http://localhost:8080/cliente`;
  clienteCambio = new Subject<Cliente[]>();

  constructor(private http:HttpClient, private router:Router) { }

  listar():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url)
    .pipe(map(data => {return data.sort((a,b) => a.id-b.id)}));
  }

  checkBooleanEmail(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/booleanEmail/${correo}`);
  }

  listarPorId(id:number) {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  listarPorEmail(correo:string) {
    return this.http.get<Cliente>(`${this.url}/consultaEmail?email=${correo}`);
  }


  registrar(datos:SignInRequest) {
    return this.http.post<JwtAuthenticationResponse>(`${entorno.HOSTNAME}/auth/signup`,datos);
  }

  actualizar(p:Cliente) {
    console.log(p);
    return this.http.put<Cliente>(`${this.url}`,p);
  }

  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  autenticar(datos:SignInRequest) {
    return this.http.post<JwtAuthenticationResponse>(`${entorno.HOSTNAME}/auth/signin`,datos);
  }

  estaLogeado() {
    let token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    return token != null;
  }

  cerrarSesion() {
    sessionStorage.clear();
    this.router.navigate(['/inicio']);
  }
  
}
