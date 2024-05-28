import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../_servicio/email.service';
import { email } from '../_modelo/email';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      let e:email={
        to : this.contactForm.value['to'],
        subject: this.contactForm.value['subject'],
        text: this.contactForm.value['text']
      }
      const { to, subject, text } = this.contactForm.value;
      this.emailService.sendEmail(e).subscribe(
        response => {
          console.log('Correo enviado', response);
        },
        error => {
          console.error('Error al enviar el correo', error);
        }
      );
    }
  }
}
