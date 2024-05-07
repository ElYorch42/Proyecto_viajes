package com.softtek.Servicio;

import com.softtek.Modelo.Actividades;
import com.softtek.Repositorio.IActividadesRepo;
import com.softtek.Repositorio.IGenericoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;

public class ActividadesServicio extends CRUD<Actividades, Integer> implements IActividadesServicio{
    @Autowired
    private IActividadesRepo repo;
    @Override
    protected IGenericoRepositorio<Actividades, Integer> getRepo(){return repo;};
}

