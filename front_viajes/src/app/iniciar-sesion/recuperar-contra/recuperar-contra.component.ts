import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../_servicio/email.service';
import { ClienteService } from '../../_servicio/cliente.service';
import { retry } from 'auth0/dist/cjs/lib/retry';
import { first } from 'rxjs';
import { email } from '../../_modelo/email';
import { Route, Router, RouterLink } from '@angular/router';
import { Update } from '../../_modelo/Update';

@Component({
  selector: 'app-recuperar-contra',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './recuperar-contra.component.html',
  styleUrl: './recuperar-contra.component.css'
})
export class RecuperarContraComponent {
  registerForm: FormGroup;
  booleanoExisteCorreo:boolean = false;
  codigo:number = 0;

  constructor(private route:Router,private fb:FormBuilder,private emailService:EmailService,private serviceCliente:ClienteService){
    this.registerForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      codigo:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
  
    })
  }

 
  ngOnInit(): void {
    sessionStorage.clear();
  }

  comprobarCorreo(): void {
    this.serviceCliente.checkBooleanEmail(this.registerForm.controls['email'].value).pipe(
      first() // Completa el observable después de la primera emisión
    ).subscribe(exists => {
      let element = document.getElementById('noexiste');
      if (!exists && element) {
        element.innerHTML = "No existe el correo"
        element.style.color = "red"
      }else if(exists && element){
        this.booleanoExisteCorreo = true;
        element.innerHTML = "Correo Enviado"
        element.style.color = "green"
        this.codigo = Math.floor(100000 + Math.random() * 900000);

        let email:email = {
          to:this.registerForm.controls['email'].value,
          subject:"Este es tu codigo",
          text:"",
          name:this.codigo.toString()
        }
        this.emailService.sendEmailRecuperacion(email).subscribe();
      }
    });
  }

  comprobarCodigo(){
    if(this.codigo == parseInt(this.registerForm.controls['codigo'].value)){
      return true
    }else{}
    return false;

  }

  onSubmit(){
    const datos:Update = {
      email:this.registerForm.controls['email'].value,
      password:this.registerForm.controls['password'].value
    }

    this.serviceCliente.updateReset(datos).subscribe();
    alert("contraseña actualizada");
    this.route.navigate(['inicio_sesion']);
  }
}