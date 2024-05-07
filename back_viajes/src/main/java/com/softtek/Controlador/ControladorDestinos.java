package com.softtek.Controlador;

import com.softtek.Modelo.Actividades;
import com.softtek.Modelo.Destinos;
import com.softtek.Servicio.IDestinoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/actividades")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorDestinos {

@Autowired
    private IDestinoServicio iDestinoServicio;

    @GetMapping
    public List<Destinos> obtenerProcuto() throws SQLException, ClassNotFoundException {
        return iDestinoServicio.obtener();
    }

    @GetMapping("/{id}")
    public Destinos obtener1Procuto(@PathVariable(name = "id") Integer id) throws SQLException, ClassNotFoundException {
        return iDestinoServicio.obtenerUno(id);
    }

    @PutMapping
    public Destinos actualizar (@RequestBody Destinos p) throws SQLException, ClassNotFoundException {
        return iDestinoServicio.actualizar(p);
    }

    @PostMapping
    public Destinos crear (@RequestBody Destinos p) throws SQLException, ClassNotFoundException {
        return iDestinoServicio.crear(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar (@PathVariable int id) throws SQLException, ClassNotFoundException {
        iDestinoServicio.delete(id);
    }


}
