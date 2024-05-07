package com.softtek.Controlador;

import com.softtek.Modelo.Actividades;
import com.softtek.Modelo.Viajes;
import com.softtek.Servicio.IViajesServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/viajes")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorViajes {

@Autowired
    private IViajesServicio iViajesServicio;

    @GetMapping
    public List<Viajes> obtenerProcuto() throws SQLException, ClassNotFoundException {
        return iViajesServicio.obtener();
    }

    @GetMapping("/{id}")
    public Viajes obtener1Procuto(@PathVariable(name = "id") Integer id) throws SQLException, ClassNotFoundException {
        return iViajesServicio.obtenerUno(id);
    }

    @PutMapping
    public Viajes actualizar (@RequestBody Viajes p) throws SQLException, ClassNotFoundException {
        return iViajesServicio.actualizar(p);
    }

    @PostMapping
    public Viajes crear (@RequestBody Viajes p) throws SQLException, ClassNotFoundException {
        return iViajesServicio.crear(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar (@PathVariable int id) throws SQLException, ClassNotFoundException {
        iViajesServicio.delete(id);
    }


}
