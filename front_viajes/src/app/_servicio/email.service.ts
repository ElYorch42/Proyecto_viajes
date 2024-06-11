import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { email } from '../_modelo/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/api/v1/email/';

  constructor(private http: HttpClient) { }

  sendEmailContacto(e:email) {
    return this.http.post(this.apiUrl+'contacto', e);
  }

  sendEmailBienvenida(e:email){
    return this.http.post(this.apiUrl+'registrarse', e);
  }

  sendEmailRecuperacion(e:email){
    return this.http.post(this.apiUrl+'recuperacion', e);
  }

  sendEmailConfirmacion(e:email){
    return this.http.post(this.apiUrl+'confirmacion',e)
  }
}
