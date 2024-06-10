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

    @Column(name = "nombre", length = 50)
    private String nombre;

    @Column(name = "dni", length = 10)
    private String dni;

    @Column(name = "direccion", length = 60)
    private String direccion;

    @Column(name = "ciudad", length = 50)
    private String ciudad;

    @Column(name = "comunidad", length = 50)
    private String comunidad;

    @Column(name = "codigo_postal", length = 6)
    private String codigoPostal;

    @ManyToOne
    @JoinColumn(name = "id_viaje",nullable = false, foreignKey = @ForeignKey(name = "FK__invitado_viaje"))
    private Viajes id_viaje;

}
