import { Component, OnInit } from '@angular/core';
import { entorno } from '../_environment/entorno';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ClienteService } from '../_servicio/cliente.service';


@Component({
  selector: 'app-perfilusuario',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './perfilusuario.component.html',
  styleUrl: './perfilusuario.component.css'
})
export class PerfilusuarioComponent implements OnInit{

  id: number = 0;
  nombre: string = "";
  dni: string = "";
  email: string= "";
  direccion: string= "";
  ciudad: string= "";
  comunidad: string= "";
  codigoPostal: string= "";
  password: string= "";
 

  

  constructor(private service:ClienteService,public jwtHelper: JwtHelperService){

  }

  cerrarsesion(){

    this.service.cerrarSesion();
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    let tokenDecodificado = token !== null ? this.jwtHelper.decodeToken(token) : null;
    if (tokenDecodificado) {
      this.email = tokenDecodificado.sub;
     console.log("email -----> "+this.email)
    }

    this.service.listarPorEmail(this.email).subscribe(
      data => {
        this.id = data.id;
        this.nombre = data.nombre;
        this.dni = data.dni;
        this.email = data.email;
        this.direccion = data.direccion;
        this.ciudad = data.ciudad;
        this.comunidad = data.comunidad;
        this.codigoPostal = data.codigoPostal;
        this.password = data.password;

      },
      error => {
        console.error('Error al obtener el contenido', error);
      }
    );
  }

}
