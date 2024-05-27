import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComienzoViajeComponent } from './comienzo-viaje/comienzo-viaje.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';

export const routes: Routes = [
    {path:'inicio' , component:InicioComponent},
    {path:'inicio_sesion' , component:IniciarSesionComponent},
    {path:'' , redirectTo:'/inicio', pathMatch:'full'},
    {path:'comienzo_viajes' , component:ComienzoViajeComponent}
   
];
