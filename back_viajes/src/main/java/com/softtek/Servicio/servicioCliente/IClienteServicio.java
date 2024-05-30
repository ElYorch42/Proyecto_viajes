package com.softtek.Servicio.servicioCliente;

import com.softtek.Modelo.Cliente;
import com.softtek.Servicio.ICRUD;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IClienteServicio extends ICRUD<Cliente,Integer> {
    UserDetailsService userDetailsService();
    Cliente consultaPorCorreo(String correo);
    Cliente updatePorCorreo(Cliente cliente);
    void updateContrasena(String email, String password);
}
