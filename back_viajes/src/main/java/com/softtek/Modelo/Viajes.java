package com.softtek.Modelo;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "Viajes")
public class Viajes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "id_cliente")
    private int id_cliente;

    @Column(name = "id_destino")
    private int id_destino;

    @Column(name = "actual")
    private boolean actual;

    @Column(name = "precio")
    private int precio;

    @Column(name = "tipocalidad")
    private String tipocalidad;


}
