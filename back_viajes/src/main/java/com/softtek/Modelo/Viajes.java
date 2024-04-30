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
@Table(name = "Viajes")
public class Viajes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne
    @JoinColumn(name = "id_cliente",nullable = false, foreignKey = @ForeignKey(name = "FK_invitado_cliente"))
    private Cliente clienteViaje;

    @ManyToOne
    @JoinColumn(name = "id_destino",nullable = false, foreignKey = @ForeignKey(name = "FK_destino_Actividad"))
    private Destinos destinoViaje;

    @Column(name = "actual")
    private boolean actual;

    @Column(name = "precio")
    private int precio;

    @Column(name = "tipocalidad")
    private String tipocalidad;

    @ManyToMany(mappedBy = "Actividades",
    cascade = CascadeType.ALL,
    fetch = FetchType.EAGER)
    List<Actividades> actividades;
}
