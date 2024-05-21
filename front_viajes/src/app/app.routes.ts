import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComienzoViajeComponent } from './comienzo-viaje/comienzo-viaje.component';

export const routes: Routes = [
    {path:'inicio' , component:InicioComponent},
    {path:'' , redirectTo:'/inicio', pathMatch:'full'},
    {path:'primero' , component:ComienzoViajeComponent}
];
