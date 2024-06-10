import { Component, EventEmitter, Output, output } from '@angular/core';
import { Invitado } from '../../_modelo/Invitado';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../_servicio/cliente.service';
import { entorno } from '../../_environment/entorno';
import { JwtHelperService } from '@auth0/angular-jwt';
import { dniNieValidator } from '../../_environment/validators';

@Component({
  selector: 'app-formulario-invitados',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-invitados.component.html',
  styleUrl: './formulario-invitados.component.css'
})
export class FormularioInvitadosComponent {



  @Output() childemiter = new EventEmitter<FormArray>();

  formulario: FormGroup;
  emaildesc:string = "";

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private servicio: ClienteService,private jwtHelper:JwtHelperService,private route:Router) {
    this.formulario = this.fb.group({
      arrayForm: this.fb.array([])

    })
  }


  
  get formArray(): FormArray {
    return this.formulario.get('arrayForm') as FormArray;
  }



  ngOnInit(): void {

   

    let token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    console.log("token2-> " + token)
    let tokenDecodificado = token !== null ? this.jwtHelper.decodeToken(token) : null;

    if (token != null) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.servicio.cerrarSesion();
        this.route.navigate(['/inicio_sesion']);
      }
    }

    if (tokenDecodificado != null) {
      this.emaildesc = tokenDecodificado.sub;
    }


    this.servicio.listarPorEmail(this.emaildesc).subscribe((data)=> {
      const anfritrion = new FormGroup({
        'nombre': new FormControl(data.nombre),
        'dni': new FormControl(data.dni),
        'direccion': new FormControl(data.direccion),
        'comunidad': new FormControl(data.comunidad),
        'codigo_postal': new FormControl(data.codigoPostal),
        'ciudad': new FormControl(data.ciudad),
        'maletas': new FormControl(0)

      });

      this.datos().push(anfritrion);
      
    })
    this.formulario.valueChanges.subscribe(()=>{
      this.childemiter.emit(this.formArray);
    })


  }

  datos(): FormArray {
    return this.formulario.get("arrayForm") as FormArray;
  }

  addDatos() {
   
    const datos = this.fb.group({
      nombre: ['', [Validators.required]],
      dni: ['', [Validators.required, dniNieValidator()]],
      direccion: ['', [Validators.required]],
      comunidad: ['', [Validators.required]],
      codigo_postal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      ciudad: ['', [Validators.required]],
      maletas: [0, [Validators.required]]

    })
    this.datos().push(datos)

  }

delete(index:number){
  this.datos().removeAt(index)
}


consolelog(){
  console.log(this.datos().value)
}


  

  


}
