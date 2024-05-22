
package com.softtek.Repositorio;

import com.softtek.Modelo.Destinos;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IDestinosRepo extends IGenericoRepositorio<Destinos,Integer>{
    @Query(value = "select * from destinos where id_pais in (select id from paises where continente= :continentes) order by random() limit 1;", nativeQuery = true)
    Destinos consultaPorContinenteAleatoria(@Param("continentes") String continente);
}
