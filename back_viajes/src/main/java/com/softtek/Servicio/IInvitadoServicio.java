package com.softtek.Servicio;

import com.softtek.Modelo.Invitado;

import java.util.List;

public interface IInvitadoServicio extends ICRUD<Invitado,Integer>{
    List<Invitado> consultaPorViaje(String correo);
}
