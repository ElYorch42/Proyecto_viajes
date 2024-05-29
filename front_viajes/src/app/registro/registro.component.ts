import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ClienteService } from '../_servicio/cliente.service';
import { routes } from '../app.routes';
import { Router, RouterLink } from '@angular/router';
import { SignUpRequest } from '../_modelo/signupRequest';
import { debounceTime, first, map, switchMap } from 'rxjs';

@Component({
    selector: 'app-registro',
    standalone: true,
    templateUrl: './registro.component.html',
    styleUrl: './registro.component.css',
    imports: [ReactiveFormsModule, NavbarComponent, FooterComponent,RouterLink]
})



export class RegistroComponent {
  registerForm: FormGroup;
  redirigir:boolean = false;

   

 
  
  constructor(private fb: FormBuilder,private service:ClienteService,private route:Router) {
    this.registerForm = this.fb.group({
      dni: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      comunidad: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      fechaNacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email],[this.emailExistsValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      urlImagen:['https://cdn.pixabay.com/photo/2016/10/22/10/52/eiffel-tower-1760354_1280.jpg']
    }, {
      validators: [this.passwordMatchValidator, this.mayorDe18Anios]
      

    });
  }

  
  redirectcion(){

  window.location.href = "https://pixabay.com/es/photos"
    
  }


  redirect(){


    this.redirigir =true;
      setTimeout(() => {
            this.route.navigate(['/inicio_sesion'])
          }, 100000000000000000);
  }

  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value === form.controls['confirmPassword'].value ? null : { mismatch: true };
  }

  mayorDe18Anios(form: FormGroup) {
    let fechaNacimientoControl = form.controls['fechaNacimiento'];
    if (!fechaNacimientoControl.value) {
        return null; // Si no hay fecha de nacimiento, no validar
    }

    let fechaNacimiento = new Date(fechaNacimientoControl.value);
    let hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    return edad >= 18 ? null : { menorDe18: true };
}


  onSubmit() {

 
    let datas:SignUpRequest = {
    nombre:  this.registerForm.controls["nombre"].value,
    dni:  this.registerForm.controls["dni"].value,
    email: this.registerForm.controls["email"].value,
    direccion:  this.registerForm.controls["direccion"].value,
    ciudad: this.registerForm.controls["ciudad"].value,
    comunidad:  this.registerForm.controls["comunidad"].value,
    codigoPostal:  this.registerForm.controls["codigoPostal"].value,
    password:  this.registerForm.controls["password"].value,
    urlImagen:  this.registerForm.controls["urlImagen"].value
    }


    console.log(datas);
    this.service.registrar(datas).subscribe(() =>{
      setTimeout(()=>{
        setTimeout(() => {
          this.route.navigate(['/inicio_sesion'])
        }, 3000);

      })
    }
    );
    
   
  }


  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        switchMap(value => this.service.checkBooleanEmail(value)),
        map(exists => (exists ? { emailExists: true } : null)),
        first()
      );
    };
  }
}
