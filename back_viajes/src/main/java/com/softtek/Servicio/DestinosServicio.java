package com.softtek.Servicio;

import com.softtek.Modelo.Destinos;
import com.softtek.Repositorio.IDestinosRepo;
import com.softtek.Repositorio.IGenericoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;

public class DestinosServicio extends CRUD<Destinos, Integer> implements IDestinoServicio{
    @Autowired
    private IDestinosRepo repo;
    @Override
    protected IGenericoRepositorio<Destinos, Integer> getRepo(){return repo;};
}
