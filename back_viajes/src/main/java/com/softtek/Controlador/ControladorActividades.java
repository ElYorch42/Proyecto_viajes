package com.softtek.Controlador;

import com.softtek.Dto.ActividadesDto;
import com.softtek.Modelo.Actividades;
import com.softtek.Servicio.IActividadesServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/actividades")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorActividades {

@Autowired
    private IActividadesServicio servicio;

    @GetMapping
    public ResponseEntity<List<ActividadesDto>> obtenerTodos() {
        List<Actividades> actividadesBBDD = servicio.obtener();
        List<ActividadesDto> ListaActividadesDto = new ArrayList<>();

        for (Actividades actividades: actividadesBBDD) {
            ActividadesDto actividadesDto = new ActividadesDto();
            ListaActividadesDto.add(actividadesDto.castActividadesADto(actividades));
        }
        return new ResponseEntity<>(ListaActividadesDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActividadesDto> obtenerUno(@PathVariable(name = "id") Integer id) {
        Actividades actividades = servicio.obtenerUno(id);
        return new ResponseEntity<>((new ActividadesDto()).castActividadesADto(actividades),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ActividadesDto> insertar(@Valid @RequestBody ActividadesDto actividadesDto) {
        Actividades actividades = actividadesDto.castActividades();
        servicio.insertar(actividades);
        return new ResponseEntity<>(actividadesDto.castActividadesADto(actividades), HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<ActividadesDto> actualizar(@Valid @RequestBody ActividadesDto actividadesDto) {
        Actividades actividades = actividadesDto.castActividades();
        servicio.actualizar(actividades);
        return new ResponseEntity<>(actividadesDto.castActividadesADto(actividades), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        servicio.eliminar(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
