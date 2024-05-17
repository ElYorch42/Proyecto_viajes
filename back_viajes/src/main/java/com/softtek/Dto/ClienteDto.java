package com.softtek.Dto;

import com.softtek.Modelo.Cliente;
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

    private String correo;

    private String direccion;

    private String ciudad;

    private String comunidad;

    private String codigoPostal;

    private String contrasena;

    public Cliente castCliente() {
        Cliente c = new Cliente();
        c.setId(id);
        c.setNombre(nombre);
        c.setDni(dni);
        c.setCorreo(correo);
        c.setDireccion(direccion);
        c.setCiudad(ciudad);
        c.setComunidad(comunidad);
        c.setCodigoPostal(codigoPostal);
        c.setContrasena(contrasena);
        return c;
    }

    public ClienteDto castClienteADto(Cliente c) {
        id =c.getId();
        nombre=c.getNombre();
        dni=c.getDni();
        correo=c.getCorreo();
        direccion=c.getDireccion();
        ciudad=c.getCiudad();
        comunidad=c.getComunidad();
        codigoPostal=c.getCodigoPostal();
        contrasena=c.getContrasena();
        return this;
    }
}
