package com.softtek.Dto;

import com.softtek.Modelo.Cliente;
import com.softtek.Modelo.Viajes;
import com.softtek.Servicio.servicioCliente.impl.ClientesServicio;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ViajesDto {
    @Autowired
            private ClientesServicio clienteS;
    int id;
//    private boolean actual;
    private double precio;
    private String tipocalidad;
    private LocalDate fecha_inicio;
    private LocalDate fecha_fin;
    private int id_destino;
    private String actividad1;
    private String actividad2;
    private String actividad3;
    private String nombre_hotel;
    private String id_hotel;
    private double latitud;
    private double lengitud;
    private Cliente id_cliente;

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
        v.setNombre_hotel(nombre_hotel);
        v.setId_hotel(id_hotel);
        v.setLatitud(latitud);
        v.setLengitud(lengitud);
        v.setId_cliente(id_cliente);
        return v;
    }

    public ViajesDto castViajesADto(Viajes v) {
        id = v.getId();
//        actual = v.isActual();
        precio = v.getPrecio();
        tipocalidad = v.getTipocalidad();
        fecha_inicio = v.getFecha_inicio();
        fecha_fin = v.getFecha_fin();
        id_destino = v.getId_destino().getId();
        actividad1 = v.getActividad1();
        actividad2 = v.getActividad2();
        actividad3 = v.getActividad3();
        nombre_hotel=v.getNombre_hotel();
        id_hotel=v.getId_hotel();
        latitud=v.getLatitud();
        lengitud=v.getLengitud();
        id_cliente= v.getId_cliente();
        return this;
    }
}
