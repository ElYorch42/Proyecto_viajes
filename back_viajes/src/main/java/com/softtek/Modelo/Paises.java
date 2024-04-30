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
@Table(name = "Paises")
public class Paises {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "continente")
    private String continente;

    @OneToMany(mappedBy = "paisDestino",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
    List<Destinos> destinos;
}
