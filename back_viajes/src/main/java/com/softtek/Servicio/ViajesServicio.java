package com.softtek.Servicio;

import com.softtek.Modelo.Viajes;
import com.softtek.Repositorio.IGenericoRepositorio;
import com.softtek.Repositorio.IViajesRepo;
import org.springframework.beans.factory.annotation.Autowired;

public class ViajesServicio extends CRUD<Viajes, Integer> implements IViajesServicio {
    @Autowired
    private IViajesRepo repo;
    @Override
    protected IGenericoRepositorio<Viajes, Integer> getRepo(){return repo;};
}