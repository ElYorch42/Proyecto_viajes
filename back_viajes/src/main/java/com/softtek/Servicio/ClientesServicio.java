package com.softtek.Servicio;

import com.softtek.Modelo.Cliente;
import com.softtek.Repositorio.IClientesRepo;
import com.softtek.Repositorio.IGenericoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientesServicio extends CRUD<Cliente, Integer> implements IClienteServicio{
    @Autowired
    private IClientesRepo repo;
    @Override
    protected IGenericoRepositorio<Cliente, Integer> getRepo(){return repo;};
}
