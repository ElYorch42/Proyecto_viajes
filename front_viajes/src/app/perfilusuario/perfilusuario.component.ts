import { Component, OnInit } from '@angular/core';
import { entorno } from '../_environment/entorno';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ContenidoService } from '../_servicio/contenido.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-perfilusuario',
  standalone: true,
  imports: [NavbarComponent,FooterComponent],
  templateUrl: './perfilusuario.component.html',
  styleUrl: './perfilusuario.component.css'
})
export class PerfilusuarioComponent implements OnInit{


  user:string = "";
  contenido:string = "";

  

  constructor(private service:ContenidoService,public jwtHelper: JwtHelperService){

  }

  

  ngOnInit(): void {
    const token = sessionStorage.getItem(entorno.TOKEN_NAME);
    let tokenDecodificado = token !== null ? this.jwtHelper.decodeToken(token) : null;
    if (tokenDecodificado) {
      this.user = tokenDecodificado.sub;
    }

    this.service.obtenerContenido().subscribe(
      data => {
        this.contenido = data.contenido;
      },
      error => {
        console.error('Error al obtener el contenido', error);
      }
    );
  }

}
