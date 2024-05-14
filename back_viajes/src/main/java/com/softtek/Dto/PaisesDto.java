package com.softtek.Dto;

import com.softtek.Modelo.Paises;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaisesDto {
    int id;
    private String nombre;
    private String continente;

    public Paises castPaises() {
        Paises p = new Paises();
        p.setId(id);
        p.setNombre(nombre);
        p.setContinente(continente);
        return p;
    }

    public PaisesDto castPaisesADto (Paises p) {
        id = p.getId();
        nombre = p.getNombre();
        continente = p.getContinente();
        return this;
    }
}
