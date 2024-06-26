import { Cliente } from "./Cliente";
import { Destinos } from "./Destinos";

export interface Viajes {
  id: number;
  id_cliente: Cliente;
  precio: number;
  tipocalidad: string;
  fecha_inicio: string;
  fecha_fin: string;
  id_destino:Destinos;
  actividad1: string;
  actividad2: string;
  actividad3: string;
  nombre_hotel:string;
  id_hotel:string;
  latitud:number;
  lengitud:number;
}
