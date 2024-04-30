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
@Table(name = "Actividades")
public class Actividades {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "nombre")
    private int nombre;

    @ManyToMany
    @JoinTable(name="Actividades_Viajes",
    joinColumns = @JoinColumn(name = "id_actividades",
    referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name = "id_viajes",
    referencedColumnName = "id"))
    private List<Viajes> viajes;
}
