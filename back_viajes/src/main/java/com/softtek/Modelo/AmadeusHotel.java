package com.softtek.Modelo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmadeusHotel {

    private String cityCode;
    private int ratings;
    private int adults;

    private String nombre_hotel;
    private String id_hotel;
    private double latitud;
    private double lengitud;
    private double precio;

    private String actividad1;
    private String actividad2;
    private String actividad3;
    private double precio_actividades;
}
