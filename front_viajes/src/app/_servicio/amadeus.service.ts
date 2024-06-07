import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AmadeusViaje } from '../_modelo/AmadeusViaje';
import { AmadeusHoteles } from '../_modelo/AmadeusHoteles';

@Injectable({
  providedIn: 'root'
})
export class AmadeusService {

  private url:string =`http://localhost:8080/amadeus`;

  constructor(private http:HttpClient) { }

  obtenerviajes(a:AmadeusViaje) {
    return this.http.post<string>(`${this.url}/viajes`,a);
  }

  obtenerHoteles(a:AmadeusHoteles) {
    return this.http.post<AmadeusHoteles>(`${this.url}/hoteles`,a);
  }

}
