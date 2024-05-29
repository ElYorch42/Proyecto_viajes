
package com.softtek.Repositorio;

import com.softtek.Modelo.Invitado;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IInvitadosRepo extends IGenericoRepositorio<Invitado,Integer> {
    @Query(value = "select * from invitado where id_viaje in (select id from Viajes where id_cliente in (select id from Cliente where email= :correo));", nativeQuery = true)
    List<Invitado> consultaPorViaje(@Param("correo") String correo);
}
