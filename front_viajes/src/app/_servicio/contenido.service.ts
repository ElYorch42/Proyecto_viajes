
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contenido } from '../_modelo/contenido';
import { entorno } from '../_environment/entorno'; 

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  constructor(private http:HttpClient) { }
  obtenerContenido():Observable<Contenido>{
    return this.http.get<Contenido>(`${entorno.HOSTNAME}/resource`)
  }
}
