package com.softtek.Modelo;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @Column(name = "codigo_ciudad", length = 3)
    private String codigo_Ciudad;

    @Column(name = "aeropuerto", length = 100)
    private String aeropuerto;

    @Column(name = "nombre", length = 50)
    private String nombre;

    @Column(name= "tipo_localidad", length = 20)
    private String tipoLocalidad;


    @ManyToOne
    @JoinColumn(name = "id_pais", nullable = false, foreignKey = @ForeignKey(name = "FK_destinos_paises"))
    private Paises paisDestino;

    @JsonIgnore
    @OneToMany(mappedBy = "id_destino",cascade = CascadeType.ALL)
    List<Viajes> viajes;

}
