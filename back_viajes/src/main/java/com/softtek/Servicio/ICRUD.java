package com.softtek.Servicio;

import java.util.List;

public interface ICRUD<T, ID> {
    List<T> obtener();
    T crear(T t);
    T actualizar(T t);
    T obtenerUno(ID id);
    void delete(ID id);
}
