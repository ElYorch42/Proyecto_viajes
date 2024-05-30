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
    public Cliente consultaPorCorreo(String correo) {
        return repo.consultaPorCorreo(correo);
    }

    @Override
    public Cliente updatePorCorreo(Cliente cliente) {
        return repo.updatePorCorreo(cliente.getNombre(), cliente.getDni(), cliente.getEmail(), cliente.getDireccion(), cliente.getCiudad(), cliente.getComunidad(), cliente.getCodigoPostal(), cliente.getUrlImagen());
    }

    @Override
    public void updateContrasena(String email, String password) {
        repo.updateContrasena(email, password);
    }
}
