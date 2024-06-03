
package com.softtek.Repositorio;

import com.softtek.Modelo.Viajes;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IViajesRepo extends IGenericoRepositorio<Viajes,Integer>{
    @Query(value = "select * from Viajes where id_cliente in (select id from Cliente where email= :correo);", nativeQuery = true)
    List<Viajes> consultaPorCliente(@Param("correo") String correo);
}
