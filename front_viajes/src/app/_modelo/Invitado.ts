import { Viajes } from "./Viajes";

export interface Invitado {
  id: number;
  nombre: string;
  dni: string;
  direccion: string;
  ciudad: string;
  comunidad: string;
  codigoPostal: string;
  id_viaje: Viajes;
}
