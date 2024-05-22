package com.softtek.Controlador;

import com.softtek.Dto.DestinosDto;
import com.softtek.Modelo.Destinos;
import com.softtek.Servicio.IDestinoServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/destinos")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorDestinos {

@Autowired
    private IDestinoServicio servicio;

    @GetMapping
    public ResponseEntity<List<DestinosDto>> obtenerTodos() {
        List<Destinos> destinosBBDD = servicio.obtener();
        List<DestinosDto> ListaDestinosDto = new ArrayList<>();

        for (Destinos destinos: destinosBBDD) {
            DestinosDto destinosDto = new DestinosDto();
            ListaDestinosDto.add(destinosDto.castDestinosADto(destinos));
        }
        return new ResponseEntity<>(ListaDestinosDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DestinosDto> obtenerUno(@PathVariable(name = "id") Integer id) {
        Destinos destinos = servicio.obtenerUno(id);
        return new ResponseEntity<>((new DestinosDto()).castDestinosADto(destinos),HttpStatus.OK);
    }

    @GetMapping("/prueba")
    public ResponseEntity<DestinosDto> consultaPorContinenteAleatoria(@RequestParam(name = "continente") String continente) {
        Destinos destinos = servicio.consultaPorContinenteAleatoria(continente);
        return new ResponseEntity<>((new DestinosDto()).castDestinosADto(destinos),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DestinosDto> insertar(@Valid @RequestBody DestinosDto destinosDto) {
        Destinos destinos = destinosDto.castDestinos();
        servicio.insertar(destinos);
        return new ResponseEntity<>(destinosDto.castDestinosADto(destinos), HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<DestinosDto> actualizar(@Valid @RequestBody DestinosDto destinosDto) {
        Destinos destinos = destinosDto.castDestinos();
        servicio.actualizar(destinos);
        return new ResponseEntity<>(destinosDto.castDestinosADto(destinos), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        servicio.eliminar(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
