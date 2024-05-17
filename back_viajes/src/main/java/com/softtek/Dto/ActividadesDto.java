package com.softtek.Dto;

import com.softtek.Modelo.Actividades;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ActividadesDto {
    private int id;
    private int nombre;

    public Actividades castActividades() {
        Actividades a = new Actividades();
        a.setId(id);
        a.setNombre(nombre);
        return a;
    }

    public ActividadesDto castActividadesADto (Actividades a) {
        id = a.getId();
        nombre = a.getNombre();
        return this;
    }
}
