import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ComienzoViajeComponent } from './comienzo-viaje/comienzo-viaje.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { SobreNostrosComponent } from './sobre-nostros/sobre-nostros.component';
import { guardSesionGuard } from './_servicio/guard-sesion.guard';
import { PerfilusuarioComponent } from './perfilusuario/perfilusuario.component';

import { RegistroComponent } from './registro/registro.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RecuperarContraComponent } from './iniciar-sesion/recuperar-contra/recuperar-contra.component';

export const routes: Routes = [
    {path:'inicio' , component:InicioComponent},
    {path:'inicio_sesion' , component:IniciarSesionComponent},
    {path:'comienzo_viajes' , component:ComienzoViajeComponent,
    canActivate:[guardSesionGuard] 
    },
    {path:'sobre_nosotros' , component:SobreNostrosComponent},
    {path:'reset_password' , component:RecuperarContraComponent},
    {path:'perfil_usuario' , component:PerfilusuarioComponent,
         canActivate:[guardSesionGuard]  
    },
    {path:'registro', component:RegistroComponent},
    {path:'contactanos',component:ContactoComponent},
    {path:"" , redirectTo:'/inicio', pathMatch:'full'},
    {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
];
