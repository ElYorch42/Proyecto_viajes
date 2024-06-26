package com.softtek.Servicio;

import com.softtek.Modelo.Destinos;
import com.softtek.Repositorio.IDestinosRepo;
import com.softtek.Repositorio.IGenericoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DestinosServicio extends CRUD<Destinos, Integer> implements IDestinoServicio{
    @Autowired
    private IDestinosRepo repo;
    @Override
    protected IGenericoRepositorio<Destinos, Integer> getRepo(){return repo;};

    @Override
    public Destinos consultaPorContinenteAleatoria(String continente) {
        return repo.consultaPorContinenteAleatoria(continente);
    }
}
