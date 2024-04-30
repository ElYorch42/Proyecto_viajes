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
@Table(name = "Destinos")
public class Destinos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name= "tipo_localidad")
    private String tipoLocalidad;

    @ManyToOne
    @JoinColumn(name = "id_pais", nullable = false, foreignKey = @ForeignKey(name = "FK_destinos_paises"))
    private Paises paisDestino;

    @OneToMany(mappedBy = "destinoActividad",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
    List<Actividades> actividades;

    @OneToMany(mappedBy = "destinoViaje",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
    List<Viajes> viajes;

}
