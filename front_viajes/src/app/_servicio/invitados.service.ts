import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { Invitado } from '../_modelo/Invitado';

@Injectable({
  providedIn: 'root'
})
export class InvitadosService {

  private url:string =`http://localhost:8080/invitado`;
  invitadoCambio = new Subject<Invitado[]>();

  constructor(private http:HttpClient) { }

  listar():Observable<Invitado[]> {
    return this.http.get<Invitado[]>(this.url)
    .pipe(map(data => {return data.sort((a,b) => a.id-b.id)}));
  }

  listarPorId(id:number) {
    return this.http.get<Invitado>(`${this.url}/${id}`);
  }

  insertar(p:Invitado) {
    console.log(p);
    return this.http.post(this.url,p);
  }

  actualizar(p:Invitado) {
    console.log(p);
    return this.http.put(this.url,p);
  }

  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
