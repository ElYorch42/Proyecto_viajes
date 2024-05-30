package com.softtek.Modelo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmadeusHotel {

    private String cityCode;
    private int radius;
    private int ratings;
    private int adults;

    private String nombre_hotel;
    private String id_hotel;
    private double latitud;
    private double lengitud;
}
