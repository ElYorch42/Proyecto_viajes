import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiViajesService {

  private urlViajes:string =`https://test.api.amadeus.com/v2/shopping/flight-offers`;

  constructor(private http:HttpClient) { }

  


}
