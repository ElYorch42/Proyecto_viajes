
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
    @Query(value = "UPDATE cliente SET nombre = :nombre1 , dni = :dni1 , email = :email1 , direccion = :direccion1 , ciudad = :ciudad1 , comunidad = :comunidad1 , codigo_postal = :codigoPostal1 , url_imagen = :urlImagen1 WHERE email = :email1 ;", nativeQuery = true)
    void updatePorCorreo(
            @Param("nombre1") String nombre,
            @Param("dni1") String dni,
            @Param("email1") String email,
            @Param("direccion1") String direccion,
            @Param("ciudad1") String ciudad,
            @Param("comunidad1") String comunidad,
            @Param("codigoPostal1") String codigoPostal,
            @Param("urlImagen1") String urlImagen);

    @Query(value = "UPDATE cliente SET password = :password1 WHERE email = :email1 ;", nativeQuery = true)
    void updateContrasena(
            @Param("email1") String email,
            @Param("password1") String password);
}
