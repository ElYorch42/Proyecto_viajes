import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { entorno } from '../_environment/entorno';

@Injectable({
  providedIn: 'root'
})
export class ApiViajesService {

  constructor(private http:HttpClient) { }

}
