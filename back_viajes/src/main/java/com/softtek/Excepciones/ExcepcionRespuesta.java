package com.softtek.Excepciones;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ExcepcionRespuesta {
    private LocalDateTime fechaHora;

    private String mensaje;

    private String descripcion;
}
