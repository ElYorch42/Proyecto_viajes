
package com.softtek.Repositorio;

import com.softtek.Modelo.Cliente;
import com.softtek.Modelo.Destinos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IClientesRepo extends IGenericoRepositorio<Cliente,Integer>, JpaRepository<Cliente,Integer> {
    Optional<Cliente> findByEmail(String email);


    @Query(value = "select * from Cliente where email = :correo ;", nativeQuery = true)
    Cliente consultaPorCorreo(@Param("correo") String correo);
}
