import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { entorno } from './_environment/entorno';

export function tokenGetter() {
  return sessionStorage.getItem(entorno.TOKEN_SESSION);
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),importProvidersFrom(
    JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            allowedDomains: ["localhost:8080"],
            disallowedRoutes: ["http://example.com/"],
            
        },
    }),
),
provideHttpClient(
    withInterceptorsFromDi()
),]
};
