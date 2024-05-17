
package com.softtek.Repositorio;

import com.softtek.Modelo.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IClientesRepo extends IGenericoRepositorio<Cliente,Integer>, JpaRepository<Cliente,Integer> {
    Optional<Cliente> findByEmail(String email);
}
