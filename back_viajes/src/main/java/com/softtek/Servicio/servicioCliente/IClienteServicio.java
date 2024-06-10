package com.softtek.Servicio.servicioCliente;

import com.softtek.Modelo.Cliente;
import com.softtek.Servicio.ICRUD;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface IClienteServicio extends ICRUD<Cliente,Integer> {
    UserDetailsService userDetailsService();
    Optional<Cliente> findByEmail(String string);
    Cliente consultaPorCorreo(String correo);
    Cliente update(Cliente cliente);
    Optional<Cliente> findById(int id);
}
