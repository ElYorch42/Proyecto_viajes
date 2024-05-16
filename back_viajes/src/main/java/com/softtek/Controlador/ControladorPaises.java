package com.softtek.Controlador;

import com.softtek.Dto.PaisesDto;
import com.softtek.Dto.PaisesDto;
import com.softtek.Modelo.Paises;
import com.softtek.Servicio.IPaisesServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/paises")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorPaises {

@Autowired
    private IPaisesServicio servicio;

    @GetMapping
    public ResponseEntity<List<PaisesDto>> obtenerTodos() {
        List<Paises> paisesBBDD = servicio.obtener();
        List<PaisesDto> ListaPaisesDto = new ArrayList<>();

        for (Paises paises: paisesBBDD) {
            PaisesDto paisesDto = new PaisesDto();
            ListaPaisesDto.add(paisesDto.castPaisesADto(paises));
        }
        return new ResponseEntity<>(ListaPaisesDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaisesDto> obtenerUno(@PathVariable(name = "id") Integer id) {
        Paises paises = servicio.obtenerUno(id);
        return new ResponseEntity<>((new PaisesDto()).castPaisesADto(paises),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PaisesDto> insertar(@Valid @RequestBody PaisesDto paisesDto) {
        Paises paises = paisesDto.castPaises();
        servicio.insertar(paises);
        return new ResponseEntity<>(paisesDto.castPaisesADto(paises), HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<PaisesDto> actualizar(@Valid @RequestBody PaisesDto paisesDto) {
        Paises paises = paisesDto.castPaises();
        servicio.actualizar(paises);
        return new ResponseEntity<>(paisesDto.castPaisesADto(paises), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        servicio.eliminar(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
