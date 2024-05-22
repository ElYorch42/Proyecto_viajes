import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { Destinos } from '../_modelo/Destinos';

@Injectable({
  providedIn: 'root'
})
export class DestinosService {

  private url:string =`http://localhost:8080/cliente`;
  destinosCambio = new Subject<Destinos[]>();

  constructor(private http:HttpClient) { }

  listar():Observable<Destinos[]> {
    return this.http.get<Destinos[]>(this.url)
    .pipe(map(data => {return data.sort((a,b) => a.id-b.id)}));
  }

  listarPorId(id:number) {
    return this.http.get<Destinos>(`${this.url}/${id}`);
  }

  insertar(p:Destinos) {
    console.log(p);
    return this.http.post(this.url,p);
  }

  actualizar(p:Destinos) {
    console.log(p);
    return this.http.put(this.url,p);
  }

  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
