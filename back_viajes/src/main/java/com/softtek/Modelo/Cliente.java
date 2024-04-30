package com.softtek.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "dni")
    private String DNI;

    @Column(name = "Correo")
    private String correo;

    @Column(name = "Dirreccion")
    private String dirreccion;

    @Column(name = "Ciudad")
    private String ciudad;

    @Column(name = "Comunidad")
    private String comunidad;

    @Column(name = "codigo_postal")
    private String codigoPostal;

    @Column(name = "Usuario")
    private String usuario;

    @Column(name = "contraseña")
    private String contrasena;
}
