package com.softtek.Controlador;

import com.softtek.Modelo.Actividades;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/actividades")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorActividades {

@Autowired
    private IActividadesServicio iActividadesServicio;

    @GetMapping
    public List<Actividades> obtenerProcuto() throws SQLException, ClassNotFoundException {
        return iActividadesServicio.obtener();
    }

    @GetMapping("/{id}")
    public Actividades obtener1Procuto(@PathVariable(name = "id") Integer id) throws SQLException, ClassNotFoundException {
        return iActividadesServicio.obtenerUno(id);
    }

    @PutMapping
    public Actividades actualizarProducto(@RequestBody Actividades p) throws SQLException, ClassNotFoundException {
        return iActividadesServicio.actualizar(p);
    }

    @PostMapping
    public Actividades crearProducto(@RequestBody Actividades p) throws SQLException, ClassNotFoundException {
        return iActividadesServicio.crear(p);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable int id) throws SQLException, ClassNotFoundException {
        iActividadesServicio.delete(id);
    }


}
