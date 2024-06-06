package com.softtek.Dto;

import com.softtek.Modelo.Cliente;
import com.softtek.Modelo.Role;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ClienteDto {

    private int id;

    private String nombre;

    private String dni;

    private String email;

    private String direccion;

    private String ciudad;

    private String comunidad;

    private String codigoPostal;

    private String password;

    private String urlImagen;

    private Role role;



    public Cliente castCliente() {
        Cliente c = new Cliente();
        c.setId(id);
        c.setNombre(nombre);
        c.setDni(dni);
        c.setEmail(email);
        c.setDireccion(direccion);
        c.setCiudad(ciudad);
        c.setComunidad(comunidad);
        c.setCodigoPostal(codigoPostal);
        c.setPassword(password);
        c.setUrlImagen(urlImagen);
        c.setRole(role);
        return c;
    }

    public ClienteDto castClienteADto(Cliente c) {
        id =c.getId();
        nombre=c.getNombre();
        dni=c.getDni();
        email=c.getEmail();
        direccion=c.getDireccion();
        ciudad=c.getCiudad();
        comunidad=c.getComunidad();
        codigoPostal=c.getCodigoPostal();
        password=c.getPassword();
        urlImagen = c.getUrlImagen();
        role = c.getRole();
        return this;
    }
}
