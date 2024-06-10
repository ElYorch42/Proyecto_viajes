import { Component } from '@angular/core';
import { Cliente } from '../_modelo/Cliente';
import { ClienteService } from '../_servicio/cliente.service';
import { entorno } from '../_environment/entorno';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { empty } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Viajes } from '../_modelo/Viajes';
import { ViajesService } from '../_servicio/viajes.service';
import { DestinosService } from '../_servicio/destinos.service';

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


  clienteMostrar: Cliente;
  viajeMostrar: Viajes[] = [];
  arrayCiudades: string[] = [];

  correoMostrar: string = "";

  viajeoperfil: boolean = false;

  buscar: FormGroup;


  constructor(private servicioDestinos: DestinosService, private servicioViajes: ViajesService, private fb: FormBuilder, private router: Router, private servicioCliente: ClienteService) {

    this.buscar = this.fb.group({
      search: ['']
    })


    this.clienteMostrar = {

      id: 0,
      nombre: "",
      dni: "",
      email: "",
      direccion: "",
      ciudad: "",
      comunidad: "",
      codigoPostal: "",
      password: "",
      urlImagen: "",
      role: ""

    }



  }





  filterClientes(value: string): void {

    console.log(value.trim());
    console.log(this.clientes);
    console.log(this.clientes2);
    if (value == "") {
      this.clientes = this.clientes2;
    } else {
      this.clientes = this.clientes.filter(cliente =>
        cliente.dni.toLowerCase().startsWith(value.toLowerCase()));
    }

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


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





  mostrarPerfil(): Cliente {


    this.viajeoperfil = false;

    this.servicioCliente.listarPorEmail(this.correoMostrar).subscribe(data => {

      this.clienteMostrar = data;


    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });


    return this.clienteMostrar;

  }


  eliminarViajes(id: number) {
    this.servicioViajes.eliminar(1).subscribe();
    //this.mostrarViajes();
  }

  mostrarViajes() {

    this.servicioViajes.listarViajesConCorreo(this.mostrarPerfil().email).subscribe(data => {
      this.viajeMostrar = data;
      this.viajeoperfil = true;
  
      this.sacarCiudad();

    })

    
    


  }


  sacarCiudad() {


    for(let i = 0;i < this.viajeMostrar.length ; i++){
        
      /*this.servicioDestinos.listarPorId(this.viajeMostrar[i].id_destino).subscribe(data =>{

        this.arrayCiudades.push(data.nombre);
      
      })*/

      
    }    
    
  

  }
  

}
