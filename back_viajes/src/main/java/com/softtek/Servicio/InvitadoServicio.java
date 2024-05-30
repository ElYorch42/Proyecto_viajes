package com.softtek.Servicio;

import com.softtek.Modelo.Invitado;
import com.softtek.Repositorio.IGenericoRepositorio;
import com.softtek.Repositorio.IInvitadosRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvitadoServicio extends CRUD<Invitado, Integer> implements IInvitadoServicio{
    @Autowired
    private IInvitadosRepo repo;
    @Override
    protected IGenericoRepositorio<Invitado, Integer> getRepo(){return repo;};

    @Override
    public List<Invitado> consultaPorViaje(String correo) {
        return repo.consultaPorViaje(correo);
    }
}