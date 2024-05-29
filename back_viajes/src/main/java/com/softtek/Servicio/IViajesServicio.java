package com.softtek.Servicio;

import com.softtek.Modelo.Viajes;

import java.util.List;

public interface IViajesServicio extends ICRUD<Viajes,Integer>{
    List<Viajes> consultaPorCliente(String correo);
}
