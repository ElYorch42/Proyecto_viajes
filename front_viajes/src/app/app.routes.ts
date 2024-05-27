import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComienzoViajeComponent } from './comienzo-viaje/comienzo-viaje.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
    {path:'inicio' , component:InicioComponent},
    {path:'' , redirectTo:'/inicio', pathMatch:'full'},
    {path:'primero' , component:ComienzoViajeComponent},
    {path:'registro', component:RegistroComponent}
];
