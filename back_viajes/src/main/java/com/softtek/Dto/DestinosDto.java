package com.softtek.Dto;

import com.softtek.Modelo.Destinos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DestinosDto {
    private int id;
    private String nombre;
    private String tipoLocalidad;

    public Destinos castDestinos () {
        Destinos d = new Destinos();
        d.setId(id);
        d.setNombre(nombre);
        d.setTipoLocalidad(tipoLocalidad);
        return d;
    }

    public DestinosDto castDestinosADto (Destinos d) {
        id = d.getId();
        nombre = d.getNombre();
        tipoLocalidad = d.getTipoLocalidad();
        return this;
    }
}
