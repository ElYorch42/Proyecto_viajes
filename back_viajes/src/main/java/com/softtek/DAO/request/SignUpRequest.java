package com.softtek.DAO.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
    private String nombre;

    private String dni;

    private String email;

    private String direccion;

    private String ciudad;

    private String comunidad;

    private String codigoPostal;

    private String password;

    private String urlImagen;

}
