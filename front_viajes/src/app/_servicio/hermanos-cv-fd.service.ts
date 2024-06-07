import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AmadeusDatos } from '../_modelo/AmadeusDatos';

@Injectable({
  providedIn: 'root'
})
export class HermanosCVFDService {

  constructor() { }

  private dataSource = new BehaviorSubject<string>('default data');
  currentData = this.dataSource.asObservable();

  changeData(data: string) {
    this.dataSource.next(data);
  }

  defaultAmadeus:AmadeusDatos = {
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    returnDate: '',
    adults: 0,
    nonStop: true,
    precioViaje: 0,
  
    ratings: 0,

    nombre_hotel: '',
    id_hotel: '',
    latitud: '',
    lengitud: '',
    precioHotel: 0,

    actividad1: '',
    actividad2: '',
    actividad3: '',
    precio_actividades: 0
  }

  private dataSourceAmadeus = new BehaviorSubject<AmadeusDatos>(this.defaultAmadeus);
  currentDataAmadeus = this.dataSourceAmadeus.asObservable();

  changeDataAmadeus(data: AmadeusDatos) {
    this.dataSourceAmadeus.next(data);
  }
}
