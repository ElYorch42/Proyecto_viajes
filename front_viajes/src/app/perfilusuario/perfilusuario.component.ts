import { Component } from '@angular/core';
import { InicioComponent } from '../inicio/inicio.component';
import { entorno } from '../_environment/entorno';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cliente } from '../_modelo/Cliente';
import { ClienteService } from '../_servicio/cliente.service';
import { DestinosService } from '../_servicio/destinos.service';
import { ContenidoService } from '../_servicio/contenido.service';

@Component({
  selector: 'app-perfilusuario',
  standalone: true,
  imports: [InicioComponent],
  templateUrl: './perfilusuario.component.html',
  styleUrl: './perfilusuario.component.css'
})
export class PerfilusuarioComponent {


  user:string = "";
  contenido:string = "";

  constructor(private service:ContenidoService,public jwtHelper: JwtHelperService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    

    const token = sessionStorage.getItem(entorno.TOKEN_NAME);
    let tokenDecodificado = token!==null?this.jwtHelper.decodeToken(token):null;
    this.user = tokenDecodificado.sub;

    this.service.obtenerContenido().subscribe(data => {this.contenido = data.contenido})


  }

}
