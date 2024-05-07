package com.softtek.Servicio;

import com.softtek.Modelo.Paises;
import com.softtek.Repositorio.IGenericoRepositorio;
import com.softtek.Repositorio.IPaisesRepo;
import org.springframework.beans.factory.annotation.Autowired;

public class PaisesServicio extends CRUD<Paises, Integer> implements IPaisesServicio {
    @Autowired
    private IPaisesRepo repo;
    @Override
    protected IGenericoRepositorio<Paises, Integer> getRepo(){return repo;};
}