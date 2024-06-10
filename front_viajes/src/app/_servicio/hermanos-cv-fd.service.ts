import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AmadeusDatos } from '../_modelo/AmadeusDatos';
import { FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HermanosCVFDService {

  constructor() { }

  private dataSource = new BehaviorSubject<string>('default data');

  private dataSource2 = new BehaviorSubject<string>('default data');

  currentData = this.dataSource.asObservable();
  currentData2 = this.dataSource2.asObservable();

  changeData(data: string) {
    this.dataSource.next(data);
  }

  changeDataAe(data:string){
    this.dataSource2.next(data);
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
    precio_actividades: 0,
    maletas: 0,
    destino:0
  }

  private dataSourceAmadeus = new BehaviorSubject<AmadeusDatos>(this.defaultAmadeus);
  currentDataAmadeus = this.dataSourceAmadeus.asObservable();

  changeDataAmadeus(data: AmadeusDatos) {
    this.dataSourceAmadeus.next(data);
  }
  formArrayData: FormArray = new FormArray([] as FormControl[]);
 
  private dataSourceInvitados = new BehaviorSubject<FormArray>(this.formArrayData);
  currentDataInvitados = this.dataSourceInvitados.asObservable();
 
  changeDataInvitados(data: FormArray) {
    this.dataSourceInvitados.next(data);
  }
}
