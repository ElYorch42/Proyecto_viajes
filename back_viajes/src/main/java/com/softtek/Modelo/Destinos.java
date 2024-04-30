package com.softtek.Modelo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
