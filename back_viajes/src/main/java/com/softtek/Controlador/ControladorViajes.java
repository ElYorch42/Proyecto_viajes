package com.softtek.Controlador;

import com.softtek.Dto.ViajesDto;
import com.softtek.Modelo.Viajes;
import com.softtek.Servicio.IViajesServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/viajes")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorViajes {

@Autowired
    private IViajesServicio servicio;

    @GetMapping
    public ResponseEntity<List<ViajesDto>> obtenerTodos() {
        List<Viajes> viajesBBDD = servicio.obtener();
        List<ViajesDto> ListaViajesDto = new ArrayList<>();

        for (Viajes viaje: viajesBBDD) {
            ViajesDto vDto = new ViajesDto();
            ListaViajesDto.add(vDto.castViajesADto(viaje));
        }
        return new ResponseEntity<>(ListaViajesDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViajesDto> obtenerUno(@PathVariable(name = "id") Integer id)  {
        Viajes viaje = servicio.obtenerUno(id);
        return new ResponseEntity<>((new ViajesDto()).castViajesADto(viaje),HttpStatus.OK);
    }

    @GetMapping("/consulta1")
    public ResponseEntity<List<ViajesDto>> consultaPorContinenteAleatoria(@RequestParam(name = "correo") String correo) {
        List<Viajes> viajesBBDD = servicio.consultaPorCliente(correo);
        List<ViajesDto> ListaViajesDto = new ArrayList<>();

        for (Viajes viaje: viajesBBDD) {
            ViajesDto vDto = new ViajesDto();
            ListaViajesDto.add(vDto.castViajesADto(viaje));
        }
        return new ResponseEntity<>(ListaViajesDto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ViajesDto> insertar(@Valid @RequestBody ViajesDto viajesDto) {
        Viajes viajes = viajesDto.castViajes();
        servicio.insertar(viajes);
        return new ResponseEntity<>(viajesDto.castViajesADto(viajes), HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<ViajesDto> actualizar(@Valid @RequestBody ViajesDto viajesDto) {
        Viajes viajes = viajesDto.castViajes();
        servicio.actualizar(viajes);
        return new ResponseEntity<>(viajesDto.castViajesADto(viajes), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        servicio.eliminar(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
