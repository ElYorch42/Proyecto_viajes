import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClienteService } from './cliente.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { entorno } from '../_environment/entorno';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export const guardAdminGuard: CanActivateFn = (route, state) => {
  const clienteService = inject(ClienteService);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  let rpta = clienteService.estaLogeado();

  if (!rpta) {
    console.log('no está logeado');
    router.navigate(['/inicio_sesion']);
    return of(false);
  } else {
    let token = sessionStorage.getItem(entorno.TOKEN_SESSION);
    if (token && !jwtHelper.isTokenExpired(token)) {
      let tokenDecodificado = jwtHelper.decodeToken(token);
      let emaildesc = tokenDecodificado.sub;

      return clienteService.listarPorEmail(emaildesc).pipe(
        map((data) => {
          if (data.role === "ADMIN") {
            return true;
          } else {
            router.navigate(['/inicio']);
            return false;
          }
        }),
        catchError((error) => {
          console.error(error);
          router.navigate(['/inicio_sesion']);
          return of(false);
        })
      );
    } else {
      router.navigate(['/inicio_sesion']);
      return of(false);
    }
  }
};
