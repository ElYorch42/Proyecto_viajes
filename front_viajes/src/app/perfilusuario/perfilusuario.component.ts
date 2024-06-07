import { Component, OnInit } from '@angular/core';
import { entorno } from '../_environment/entorno';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ClienteService } from '../_servicio/cliente.service';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first, map, switchMap } from 'rxjs';
import { SignUpRequest } from '../_modelo/signupRequest';
import { Router } from '@angular/router';
import { Cliente } from '../_modelo/Cliente';
import { MostrarViajesComponent } from './mostrar-viajes/mostrar-viajes.component';
import { dniNieValidator } from '../_environment/validators';


@Component({
  selector: 'app-perfilusuario',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule,MostrarViajesComponent],
  templateUrl: './perfilusuario.component.html',
  styleUrl: './perfilusuario.component.css'
})
export class PerfilusuarioComponent {

  registerForm: FormGroup;
  redirigir: boolean = false;
  imagen:string = "";
  emaildesc:string = "";


  constructor(private fb: FormBuilder, private service: ClienteService, private route: Router,private jwtHelper:JwtHelperService) {
    this.registerForm = this.fb.group({
      dni: ['', [Validators.required,dniNieValidator()]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      comunidad: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      fechaNacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator()]],
      urlImagen: ['', [this.urlValidator()]]
    }, {
      validators: [this.mayorDe18Anios]
    });
  }







  ngOnInit(): void {

    
    let token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    console.log("token2-> " + token)
    let tokenDecodificado = token !== null ? this.jwtHelper.decodeToken(token) : null;

    if (token != null) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.service.cerrarSesion();
        this.route.navigate(['/inicio_sesion']);
      }
    }

    if (tokenDecodificado != null) {
      this.emaildesc = tokenDecodificado.sub;
    }
    console.log("email: " + this.emaildesc)

    this.imagen = this.registerForm.controls['urlImagen'].value;

    this.service.listarPorEmail(this.emaildesc).subscribe((data) => {
      this.registerForm = new FormGroup({
        'dni': new FormControl(data.dni),
        'nombre': new FormControl(data.nombre),
        'apellidos': new FormControl(null),
        'direccion': new FormControl(data.direccion),
        'ciudad': new FormControl(data.ciudad),
        'comunidad': new FormControl(data.comunidad),
        'codigoPostal': new FormControl(data.codigoPostal),
        'fechaNacimiento': new FormControl(null),
        'email': new FormControl(data.email),
        'urlImagen': new FormControl(data.urlImagen),

      });
      this.imagen = this.registerForm.controls["urlImagen"].value;

    
    })


  }



  urlValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const url = control.value;
      return url && url.includes("https://cdn.pixabay.com") ? null : { invalidUrl: true };
    };
  }


  redirectcion() {

    window.open("https://pixabay.com/es/photos", "_blank")

  }


  redirect() {


    this.redirigir = true;
    setTimeout(() => {
      this.route.navigate(['/inicio_sesion'])
    }, 100000000000000000);
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

    
    this.service.listarPorEmail(this.emaildesc).subscribe((data) => {
  
        let clientes: Cliente = {
          id: data.id,
          nombre: this.registerForm.controls["nombre"].value,
          dni: this.registerForm.controls["dni"].value,
          email: this.registerForm.controls["email"].value,
          direccion: this.registerForm.controls["direccion"].value,
          ciudad: this.registerForm.controls["ciudad"].value,
          comunidad: this.registerForm.controls["comunidad"].value,
          codigoPostal: this.registerForm.controls["codigoPostal"].value,
          password: data.password,
          urlImagen: this.registerForm.controls["urlImagen"].value,
          role:data.role
        };
         
        this.service.actualizar(clientes).subscribe();
    
    })




    
   

  }

  cerrarsesion() {

    this.service.cerrarSesion();
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
