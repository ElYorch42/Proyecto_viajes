
package com.softtek.Repositorio;

import com.softtek.Modelo.Destinos;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IDestinosRepo extends IGenericoRepositorio<Destinos,Integer>{
    @Query(value = "SELECT d.*, p.nombre AS pais\n" +
            "FROM destinos d\n" +
            "JOIN paises p ON d.id_pais = p.id\n" +
            "WHERE p.continente = 'Oceania'\n" +
            "ORDER BY RANDOM()\n" +
            "LIMIT 1;", nativeQuery = true)
    Destinos consultaPorContinenteAleatoria(@Param("continentes") String continente);
}
