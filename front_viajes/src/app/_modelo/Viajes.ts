import { Destinos } from "./Destinos";

export interface Viajes {
  id: number;
  id_cliente: number;
  precio: number;
  tipocalidad: string;
  fecha_inicio: string;
  fecha_fin: string;
  destinoViaje:number;
  actividad1: string;
  actividad2: string;
  actividad3: string;
}
