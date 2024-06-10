import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { entorno } from '../_environment/entorno';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClienteService } from '../_servicio/cliente.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  nombre: string = "";
  urlImagen: string = "";

  token: any = "";

  isCollapsed1: boolean = true;
  cambiarLogoBool: boolean = false;
  esAdmin = false;

  constructor(private service: ClienteService, public jwtHelper: JwtHelperService, private router: Router) {

  }




  ngOnInit(): void {
    this.checkScreenWidth();



    this.token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    
    let emaildesc;
    let tokenDecodificado = this.token !== null ? this.jwtHelper.decodeToken(this.token) : null;

    if (this.token != null) {
      if (this.jwtHelper.isTokenExpired(this.token)) {
        this.service.cerrarSesion();
        this.router.navigate(['/inicio_sesion']);
      }
    }

    if (tokenDecodificado != null) {
      emaildesc = tokenDecodificado.sub;
    }


    if (tokenDecodificado) {
      this.service.listarPorEmail(emaildesc).subscribe(
        data => {
          this.nombre = data.nombre;

          if(data.role == "ADMIN"){
            this.esAdmin = true;

          }



        },
        error => {
          console.error('Error al obtener el contenido', error);
        }
      );
    }



  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    if (window.innerWidth > 768) {
      this.isCollapsed1 = true;

    }

  }

  toggleCollapse1(): void {
    this.isCollapsed1 = !this.isCollapsed1;
  }

  cambiarlogo() {
    return this.cambiarLogoBool = false;
  }
  cambiarlogot() {
    return this.cambiarLogoBool = true;
  }




}
