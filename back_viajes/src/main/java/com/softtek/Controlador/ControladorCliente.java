package com.softtek.Controlador;

import com.softtek.Dto.ClienteDto;
import com.softtek.Modelo.Cliente;
import com.softtek.Modelo.Cliente;
import com.softtek.Servicio.IClienteServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorCliente {

@Autowired
    private IClienteServicio servicio;

    @GetMapping
    public ResponseEntity<List<ClienteDto>> obtenerTodos() {
        List<Cliente> clienteBBDD = servicio.obtener();
        List<ClienteDto> ListaClienteDto = new ArrayList<>();

        for (Cliente cliente: clienteBBDD) {
            ClienteDto clienteDto = new ClienteDto();
            ListaClienteDto.add(clienteDto.castClienteADto(cliente));
        }
        return new ResponseEntity<>(ListaClienteDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteDto> obtenerUno(@PathVariable(name = "id") Integer id) {
        Cliente cliente = servicio.obtenerUno(id);
        return new ResponseEntity<>((new ClienteDto()).castClienteADto(cliente),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ClienteDto> insertar(@Valid @RequestBody ClienteDto clienteDto) {
        Cliente cliente = clienteDto.castCliente();
        servicio.insertar(cliente);
        return new ResponseEntity<>(clienteDto.castClienteADto(cliente), HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<ClienteDto> actualizar(@Valid @RequestBody ClienteDto clienteDto) {
        Cliente cliente = clienteDto.castCliente();
        servicio.actualizar(cliente);
        return new ResponseEntity<>(clienteDto.castClienteADto(cliente), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        servicio.eliminar(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
