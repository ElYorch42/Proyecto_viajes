package com.softtek.Modelo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Viajes")
public class Viajes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_cliente",nullable = false, foreignKey = @ForeignKey(name = "FK_cliente_viaje"))
    private Cliente clienteViaje;

    @OneToMany(mappedBy = "viajeInvitado",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
    List<Invitado> invitados;

    @ManyToOne
    @JoinColumn(name = "id_destino",nullable = false, foreignKey = @ForeignKey(name = "FK_destino_Actividad"))
    private Destinos destinoViaje;

//    @Column(name = "actual")
//    private boolean actual;

    @Column(name = "precio")
    private int precio;

    @Column(name = "tipocalidad", length = 20)
    private String tipocalidad;

    @Temporal(TemporalType.DATE)
    private LocalDate fecha_inicio;

    @Temporal(TemporalType.DATE)
    private LocalDate fecha_fin;

    @Column(name = "actividad1")
    private String actividad1;

    @Column(name = "actividad2")
    private String actividad2;

    @Column(name = "actividad3")
    private String actividad3;
}
