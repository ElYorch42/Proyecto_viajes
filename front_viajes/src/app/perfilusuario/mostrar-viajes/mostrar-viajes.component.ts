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
  imagen:string = "";
  @Input() correoDesEnc: string = "";

  constructor(private servicio: ViajesService, private servicioCiudad: DestinosService) {

  }

  ngOnInit(): void {

    this.servicio.listarViajesConCorreo(this.correoDesEnc).subscribe((data) => {
      console.log( "destinos")
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.servicioCiudad.listarPorId(data[i].id_destino.id).subscribe((data2) => {
          let res = new Date(data[i].fecha_fin).getTime() < new Date(Date.now()).getTime();
         
          
          if (res) {
            this.arrayViajes.push(data[i]);

            
              this.nombreCiudad.push(data2.nombre)
           
          }

      

        })

        console.log(this.arrayViajes)
        console.log(this.nombreCiudad);
      }

     

    });

  }




}
