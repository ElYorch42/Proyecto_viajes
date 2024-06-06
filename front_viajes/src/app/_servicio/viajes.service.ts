import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { Viajes } from '../_modelo/Viajes';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  private url:string =`http://localhost:8080/viajes`;
  viajesCambio = new Subject<Viajes[]>();

  constructor(private http:HttpClient) { }

  listar():Observable<Viajes[]> {
    return this.http.get<Viajes[]>(this.url)
    .pipe(map(data => {return data.sort((a,b) => a.id-b.id)}));
  }

  
 
  listarViajesConCorreo(email:string):Observable<Viajes[]> {
    return this.http.get<Viajes[]>(`${this.url}/viajeCorreoCliente?email=${email}`);   
  }


  listarporIdCliente(id:number):Observable<Viajes[]> {
    return this.http.get<Viajes[]>(this.url);
  }

  
  listarPorId(id:number) {
    return this.http.get<Viajes>(`${this.url}/${id}`);
  }

  insertar(p:Viajes) {
    console.log(p);
    return this.http.post(this.url,p);
  }

  actualizar(p:Viajes) {
    console.log(p);
    return this.http.put(this.url,p);
  }

  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  
}
