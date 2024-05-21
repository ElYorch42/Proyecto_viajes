import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { Cliente } from '../_modelo/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url:string =`http://localhost:8080/cliente`;
  clienteCambio = new Subject<Cliente[]>();

  constructor(private http:HttpClient) { }

  listar():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url)
    .pipe(map(data => {return data.sort((a,b) => a.id-b.id)}));
  }

  listarPorId(id:number) {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  insertar(p:Cliente) {
    console.log(p);
    return this.http.post(this.url,p);
  }

  actualizar(p:Cliente) {
    console.log(p);
    return this.http.put(this.url,p);
  }

  eliminar(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
