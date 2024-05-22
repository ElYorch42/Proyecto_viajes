import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { entorno } from '../_environment/entorno';


@Injectable({
  providedIn: 'root'
})
export class ApiViajesService {

  

  constructor(private http:HttpClient) { }

  setTokenAmadeus() {
    if (sessionStorage.getItem(entorno.TOKEN_AMADEUS) == null ) {
      //this.http.post(this.urlToken)
    }
  }


  listarViajesDisponibles() {
    //return this.http.get(`${this.urlViajes}/`).subscribe(data => {})
  }

  

}
