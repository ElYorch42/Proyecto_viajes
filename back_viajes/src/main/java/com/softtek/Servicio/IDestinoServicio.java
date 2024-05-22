package com.softtek.Servicio;

import com.softtek.Modelo.Destinos;

public interface IDestinoServicio extends ICRUD<Destinos,Integer>{
    Destinos consultaPorContinenteAleatoria(String continente);
}
