package com.softtek.Servicio;

import com.softtek.Modelo.Viajes;
import com.softtek.Repositorio.IGenericoRepositorio;
import com.softtek.Repositorio.IViajesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ViajesServicio extends CRUD<Viajes, Integer> implements IViajesServicio {
    @Autowired
    private IViajesRepo repo;
    @Override
    protected IGenericoRepositorio<Viajes, Integer> getRepo(){return repo;};

    @Override
    public List<Viajes> consultaPorCliente(String correo) {
        return repo.consultaPorCliente(correo);
    }
}