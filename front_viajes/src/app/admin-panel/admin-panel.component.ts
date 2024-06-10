import { Component } from '@angular/core';
import { Cliente } from '../_modelo/Cliente';
import { ClienteService } from '../_servicio/cliente.service';
import { entorno } from '../_environment/entorno';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { empty } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Viajes } from '../_modelo/Viajes';
import { ViajesService } from '../_servicio/viajes.service';
import { DestinosService } from '../_servicio/destinos.service';
import { Update } from '../_modelo/Update';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {


  
  clientes: Cliente[] = [];
  clientes2: Cliente[] = [];


  viajeMostrar: Viajes[] = [];
  arrayCiudades: string[] = [];

  correoMostrar: string = "";

  viajeoperfil: boolean = false;

  buscar: FormGroup;

  formulario:FormGroup;
 

  constructor(public jwtHelper: JwtHelperService,private fb2:FormBuilder,private servicioDestinos: DestinosService, private servicioViajes: ViajesService, private fb: FormBuilder, private router: Router, private servicioCliente: ClienteService) {

    this.buscar = this.fb.group({
   

      search: ['']
    })

    this.formulario = this.fb2.group({

      dni: ['', [Validators.required]],
      role:[''],
      password:[''],  
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      comunidad: ['', [Validators.required]],
      codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      fechaNacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      urlImagen: ['']



    })




  }





  filterClientes(value: string): void {

    if (value == "") {
      this.clientes = this.clientes2;
    } else {
      this.clientes = this.clientes.filter(cliente =>
        cliente.dni.toLowerCase().startsWith(value.toLowerCase()));
    }

  }

  

  

  ngOnInit(): void {
  


    

    this.buscar.get('search')?.valueChanges.subscribe(value => {
      this.filterClientes(value);
    });


    if (sessionStorage.getItem(entorno.TOKEN_SESSION) === "") {
      this.servicioCliente.cerrarSesion();

    }

    this.servicioCliente.listar().subscribe((data) => {

      this.clientes = data;
      this.clientes2 = data;
    })
  }





  mostrarPerfil() {


    this.viajeoperfil = false;

    this.servicioCliente.listarPorEmail(this.correoMostrar).subscribe(data => {

      this.formulario = new FormGroup({
        'dni': new FormControl(data.dni),
        'password':new FormControl(data.password),
        'role':new FormControl(data.role),
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

      
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });


    })


  }



  actualizarContra(){
    let update = {
      email:this.formulario.controls["email"].value,
      password:this.formulario.controls["password"].value
    }
  
    this.servicioCliente.updateReset(update).subscribe();

    window.location.reload();
  }


  actualizar(){

    


    this.servicioCliente.listarPorEmail(this.formulario.controls["email"].value).subscribe((data) => {
  
      let clientes: Cliente = {
        id: data.id,
        nombre: this.formulario.controls["nombre"].value,
        dni: this.formulario.controls["dni"].value,
        email: this.formulario.controls["email"].value,
        direccion: this.formulario.controls["direccion"].value,
        ciudad: this.formulario.controls["ciudad"].value,
        comunidad: this.formulario.controls["comunidad"].value,
        codigoPostal: this.formulario.controls["codigoPostal"].value,
        password: data.password,
        urlImagen: this.formulario.controls["urlImagen"].value,
        role:data.role
      };
       
      this.servicioCliente.actualizar(clientes).subscribe();
      window.location.reload();
  })



  }


  eliminarViajes(id: number) {
    this.servicioViajes.eliminar(id).subscribe();
    //this.mostrarViajes();
  }

  mostrarViajes() {

    this.servicioViajes.listarViajesConCorreo(this.formulario.controls["email"].value).subscribe(data => {
      this.viajeMostrar = data;
      this.viajeoperfil = true;
  
      this.sacarCiudad();

    })
  }


  sacarCiudad() {


    for(let i = 0;i < this.viajeMostrar.length ; i++){
        
      this.servicioDestinos.listarPorId(this.viajeMostrar[i].id_destino.id).subscribe(data =>{

        this.arrayCiudades.push(data.nombre);
      
      })

      
    }    
    
  

  }
  

}
