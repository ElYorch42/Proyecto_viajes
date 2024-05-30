import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { email } from '../_modelo/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/api/v1/email/send';

  constructor(private http: HttpClient) { }

  sendEmail(e:email) {
    return this.http.post(this.apiUrl, e);
  }
}
