package com.softtek.Controlador;

import com.softtek.Dto.InvitadoDto;
import com.softtek.Modelo.Invitado;
import com.softtek.Modelo.Invitado;
import com.softtek.Servicio.IInvitadoServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/invitado")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorInvitado {

@Autowired
    private IInvitadoServicio servicio;

    @GetMapping
    public ResponseEntity<List<InvitadoDto>> obtenerTodos() {
        List<Invitado> invitadoBBDD = servicio.obtener();
        List<InvitadoDto> ListaInvitadoDto = new ArrayList<>();

        for (Invitado invitado: invitadoBBDD) {
            InvitadoDto invitadoDto = new InvitadoDto();
            ListaInvitadoDto.add(invitadoDto.castInvitadoADto(invitado));
        }
        return new ResponseEntity<>(ListaInvitadoDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvitadoDto> obtenerUno(@PathVariable(name = "id") Integer id) {
        Invitado invitado = servicio.obtenerUno(id);
        return new ResponseEntity<>((new InvitadoDto()).castInvitadoADto(invitado),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<InvitadoDto> insertar(@Valid @RequestBody InvitadoDto invitadoDto) {
        Invitado invitado = invitadoDto.castInvitado();
        servicio.insertar(invitado);
        return new ResponseEntity<>(invitadoDto.castInvitadoADto(invitado), HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<InvitadoDto> actualizar(@Valid @RequestBody InvitadoDto invitadoDto) {
        Invitado invitado = invitadoDto.castInvitado();
        servicio.actualizar(invitado);
        return new ResponseEntity<>(invitadoDto.castInvitadoADto(invitado), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        servicio.eliminar(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
