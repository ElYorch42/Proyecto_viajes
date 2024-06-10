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
import { PaymentComponent } from './payment/payment.component';
import { FormularioDatosComponent } from './formulario-datos/formulario-datos.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { guardAdminGuard } from './_servicio/guard-admin.guard';

export const routes: Routes = [
    {path:'inicio' , component:InicioComponent},
    {path:'inicio_sesion' , component:IniciarSesionComponent},
    {path:'comienzo_viajes' , component:ComienzoViajeComponent,
    canActivate:[guardSesionGuard] 
    },
    {path:'admin' , component:AdminPanelComponent,
        
        canActivate:[guardAdminGuard,guardSesionGuard]
    },
    {path:'sobre_nosotros' , component:SobreNostrosComponent},
    {path:'reset_password' , component:RecuperarContraComponent},
    {path:'perfil_usuario' , component:PerfilusuarioComponent,
         canActivate:[guardSesionGuard]  
    },
    {path:'datos', component:FormularioDatosComponent,
    canActivate:[guardSesionGuard]  
},
    {path:'registro', component:RegistroComponent},
    {path:'pago',component:PaymentComponent},
    {path:'contactanos',component:ContactoComponent},
    {path:"" , redirectTo:'/inicio', pathMatch:'full'},
    {path: '**', redirectTo: '/inicio', pathMatch: 'full'}
    
];
