
package com.softtek.Repositorio;

import com.softtek.Modelo.Cliente;
import com.softtek.Modelo.Destinos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IClientesRepo extends IGenericoRepositorio<Cliente,Integer>, JpaRepository<Cliente,Integer> {
    Optional<Cliente> findByEmail(String email);


    @Query(value = "select * from Cliente where email = :correo ;", nativeQuery = true)
    Cliente consultaPorCorreo(@Param("correo") String correo);

    @Query(value = "update cliente set nombre = :nombre1 , dni = :dni1 , direccion = :direccion1 , ciudad = :ciudad1 , comunidad = :comunidad1 , codigo_postal = :codigoPostal1 , url_imagen = :urlImagen1 where id = :id1 ;", nativeQuery = true)
    Cliente update(@Param("nombre1") String nombre,
                   @Param("dni1") String dni,
                   @Param("direccion1") String direccion,
                   @Param("ciudad1") String ciudad,
                   @Param("comunidad1") String comunidad,
                   @Param("codigoPostal1") String codigoPostal,
                   @Param("urlImagen1") String urlImagen,
                   @Param("id1") int id);
}
