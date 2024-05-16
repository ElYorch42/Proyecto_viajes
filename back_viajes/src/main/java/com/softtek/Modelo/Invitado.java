package com.softtek.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "invitado")
public class Invitado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "dni")
    private String dni;

    @Column(name = "Direccion")
    private String direccion;

    @Column(name = "Ciudad")
    private String ciudad;

    @Column(name = "Comunidad")
    private String comunidad;

    @Column(name = "codigo_postal")
    private String codigoPostal;

    @ManyToOne
    @JoinColumn(name = "id_cliente",nullable = false, foreignKey = @ForeignKey(name = "FK_invitado_cliente"))
    private Cliente clienteInvitado;

    @ManyToOne
    @JoinColumn(name = "id_viaje",nullable = false, foreignKey = @ForeignKey(name = "FK__invitado_viaje"))
    private Viajes viajeInvitado;

}
