package com.softtek.Modelo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmadeusDatos {

    private String originLocationCode;
    private String destinationLocationCode;
    private String departureDate;
    private String returnDate;
    private int adults;
    private boolean nonStop;
    private double precioViaje;

    private int ratings;

    private String nombre_hotel;
    private String id_hotel;
    private double latitud;
    private double lengitud;
    private double precioHotel;

    private String actividad1;
    private String actividad2;
    private String actividad3;
    private Double precio_actividades;
}
