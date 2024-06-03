package com.softtek.Dto;

import com.softtek.Modelo.Destinos;
import com.softtek.Modelo.Viajes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ViajesDto {
    int id;
//    private boolean actual;
    private int precio;
    private String tipocalidad;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private int destinoViaje;
    private String actividad1;
    private String actividad2;
    private String actividad3;

    public Viajes castViajes() {
        Viajes v = new Viajes();
        v.setId(id);
//        v.setActual(actual);
        v.setPrecio(precio);
        v.setTipocalidad(tipocalidad);
        v.setFecha_inicio(fecha_inicio);
        v.setFecha_fin(fecha_fin);
        v.setActividad1(actividad1);
        v.setActividad2(actividad2);
        v.setActividad3(actividad3);
        return v;
    }

    public ViajesDto castViajesADto(Viajes v) {
        id = v.getId();
//        actual = v.isActual();
        precio = v.getPrecio();
        tipocalidad = v.getTipocalidad();
        fecha_inicio = v.getFecha_inicio();
        fecha_fin = v.getFecha_fin();
        destinoViaje = v.getDestinoViaje().getId();
        actividad1 = v.getActividad1();
        actividad2 = v.getActividad2();
        actividad3 = v.getActividad3();
        return this;
    }
}
