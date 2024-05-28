import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClienteService } from './cliente.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { entorno } from '../_environment/entorno';

export const guardSesionGuard: CanActivateFn = (route, state) => {

  const clienteService = inject(ClienteService);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService)

  let rpta = clienteService.estaLogeado();

  if (!rpta) {
    console.log('no esta logeado');
    clienteService.cerrarSesion()
    return false;
  } else {
    let token = sessionStorage.getItem(entorno.TOKEN_NAME);
    if (!jwtHelper.isTokenExpired(token)) {
      console.log('no ha expirado el toke');
      return true;
    } else {
      clienteService.cerrarSesion()
      return false;
    }
  }

};
