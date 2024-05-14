package com.softtek.Controlador;

import com.softtek.Modelo.Actividades;
import com.softtek.Modelo.Paises;
import com.softtek.Servicio.IPaisesServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/paises")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorPaises {

@Autowired
    private IPaisesServicio iPaisesServicio;

    @GetMapping
    public List<Paises> obtenerProcuto() throws SQLException, ClassNotFoundException {
        return iPaisesServicio.obtener();
    }

    @GetMapping("/{id}")
    public Paises obtener1Procuto(@PathVariable(name = "id") Integer id) throws SQLException, ClassNotFoundException {
        return iPaisesServicio.obtenerUno(id);
    }

    @PutMapping
    public Paises actualizar (@RequestBody Paises p) throws SQLException, ClassNotFoundException {
        return iPaisesServicio.actualizar(p);
    }

    @PostMapping
    public Paises crear (@RequestBody Paises p) throws SQLException, ClassNotFoundException {
        return iPaisesServicio.crear(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar (@PathVariable int id) throws SQLException, ClassNotFoundException {
        iPaisesServicio.delete(id);
    }


}
