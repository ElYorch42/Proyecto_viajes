package com.softtek.Servicio.servicioCliente.impl;

import com.softtek.Modelo.Cliente;
import com.softtek.Repositorio.IClientesRepo;
import com.softtek.Repositorio.IGenericoRepositorio;
import com.softtek.Servicio.CRUD;
import com.softtek.Servicio.servicioCliente.IClienteServicio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClientesServicio extends CRUD<Cliente, Integer> implements IClienteServicio {
    @Autowired
    private IClientesRepo repo;
    @Override
    protected IGenericoRepositorio<Cliente, Integer> getRepo(){return repo;};

    private final IClientesRepo userRepository;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username)  {
                return userRepository.findByEmail(username)
                        .orElseThrow(()-> new UsernameNotFoundException("Usuario no encontrado"));
            }
        };
    }

    @Override
    public Optional<Cliente> findByEmail(String email) {
        return repo.findByEmail(email);
    }

    @Override
    public Cliente consultaPorCorreo(String correo) {
        return repo.consultaPorCorreo(correo);
    }

    @Override
    public Cliente update(Cliente cliente) {
        return repo.update(cliente.getNombre(), cliente.getDni(), cliente.getDireccion(), cliente.getCiudad(), cliente.getComunidad(), cliente.getCodigoPostal(), cliente.getUrlImagen(), cliente.getId());
    }
    @Override
    public Optional<Cliente> findById(int id){
        return repo.findById(id);
    }
}
