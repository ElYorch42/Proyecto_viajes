import { Component, DestroyRef, Input } from '@angular/core';
import { Viajes } from '../../_modelo/Viajes';
import { ViajesService } from '../../_servicio/viajes.service';
import { ClienteService } from '../../_servicio/cliente.service';
import { DestinosService } from '../../_servicio/destinos.service';

@Component({
  selector: 'app-mostrar-viajes',
  standalone: true,
  imports: [],
  templateUrl: './mostrar-viajes.component.html',
  styleUrl: './mostrar-viajes.component.css'
})
export class MostrarViajesComponent {


  nombreCiudad: string[] = [];
  arrayViajes: Viajes[] = [];
  @Input() correoDesEnc: string = "";

  constructor(private servicio: ViajesService, private servicioCiudad: DestinosService) {

  }

  ngOnInit(): void {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.servicio.listarViajesConCorreo(this.correoDesEnc).subscribe((data) => {

      for (let i = 0; i < data.length; i++) {
        this.servicioCiudad.listarPorId(data[i].destinoViaje).subscribe((data2) => {
          let res = new Date(data[i].fecha_fin).getTime() < new Date(Date.now()).getTime();
         

          if (res) {
            this.arrayViajes.push(data[i]);
          }

          this.nombreCiudad[i] = data2.nombre;





        });
      }


    });

  }




}
