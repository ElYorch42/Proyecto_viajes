export interface AmadeusDatos {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  nonStop: boolean;
  precioViaje: number;
  
  ratings: number;

  nombre_hotel: string;
  id_hotel: string;
  latitud: string;
  lengitud: string;
  precioHotel: number;

  actividad1: string;
  actividad2: string;
  actividad3: string;
  precio_actividades: number;
  maletas: number;
}
