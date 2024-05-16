package com.softtek.Dto;

import com.softtek.Modelo.Cliente;
import com.softtek.Modelo.Invitado;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class InvitadoDto {

    private int id;

    private String nombre;

    private String dni;

    private String direccion;

    private String ciudad;

    private String comunidad;

    private String codigoPostal;

    public Invitado castInvitado() {
        Invitado i = new Invitado();
        i.setId(id);
        i.setNombre(nombre);
        i.setDni(dni);
        i.setDireccion(direccion);
        i.setCiudad(ciudad);
        i.setComunidad(comunidad);
        i.setCodigoPostal(codigoPostal);
        return i;
    }

    public InvitadoDto castInvitadoADto(Invitado i) {
        id =i.getId();
        nombre=i.getNombre();
        dni=i.getDni();
        direccion=i.getDireccion();
        ciudad=i.getCiudad();
        comunidad=i.getComunidad();
        codigoPostal=i.getCodigoPostal();
        return this;
    }
}
