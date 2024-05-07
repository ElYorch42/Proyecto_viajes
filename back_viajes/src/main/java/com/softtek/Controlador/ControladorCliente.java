package com.softtek.Controlador;

import com.softtek.Modelo.Actividades;
import com.softtek.Modelo.Cliente;
import com.softtek.Servicio.IClienteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/actividades")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorCliente {

@Autowired
    private IClienteServicio iClienteServicio;

    @GetMapping
    public List<Cliente> obtenerProcuto() throws SQLException, ClassNotFoundException {
        return iClienteServicio.obtener();
    }

    @GetMapping("/{id}")
    public Cliente obtener1Procuto(@PathVariable(name = "id") Integer id) throws SQLException, ClassNotFoundException {
        return iClienteServicio.obtenerUno(id);
    }

    @PutMapping
    public Cliente actualizar (@RequestBody Cliente p) throws SQLException, ClassNotFoundException {
        return iClienteServicio.actualizar(p);
    }

    @PostMapping
    public Cliente crear (@RequestBody Cliente p) throws SQLException, ClassNotFoundException {
        return iClienteServicio.crear(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar (@PathVariable int id) throws SQLException, ClassNotFoundException {
        iClienteServicio.delete(id);
    }


}
