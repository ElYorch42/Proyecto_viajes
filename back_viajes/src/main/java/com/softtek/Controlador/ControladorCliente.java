package com.softtek.Controlador;

import com.softtek.Dto.ClienteDto;
import com.softtek.Modelo.Cliente;
import com.softtek.Servicio.servicioCliente.IClienteServicio;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/consultaEmail")
    public ResponseEntity<ClienteDto> consultaPorCorreo(@RequestParam(name = "email") String email) {
        Cliente cliente = servicio.consultaPorCorreo(email);
        return new ResponseEntity<>((new ClienteDto()).castClienteADto(cliente),HttpStatus.OK);
    }

    @GetMapping("/booleanEmail/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        Optional<Cliente> cliente = servicio.findByEmail(email);
        boolean exists = cliente.isPresent();
        return ResponseEntity.ok(exists);
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


    @PutMapping("/update")
    public ResponseEntity<ClienteDto> update(@Valid @RequestBody ClienteDto clienteDto) {
        Cliente cliente = clienteDto.castCliente();
        servicio.update(cliente);
        return new ResponseEntity<>(clienteDto.castClienteADto(cliente), HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        servicio.eliminar(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
