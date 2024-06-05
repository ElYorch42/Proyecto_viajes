import { Component } from '@angular/core';
import { FormularioInvitadosComponent } from './formulario-invitados/formulario-invitados.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { FormularioAnfitrionComponent } from './formulario-anfitrion/formulario-anfitrion.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../_servicio/cliente.service';

@Component({
  selector: 'app-formulario-datos',
  standalone: true,
  imports: [FormularioInvitadosComponent,NavbarComponent,FooterComponent,FormularioAnfitrionComponent,ReactiveFormsModule],
  templateUrl: './formulario-datos.component.html',
  styleUrl: './formulario-datos.component.css'
})
export class FormularioDatosComponent {
  formulario: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private servicio: ClienteService) {
    this.formulario = this.fb.group({
      hotel:new FormControl('')

    })
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  console.log(  this.formulario.controls["hotel"].value)
  }

}
