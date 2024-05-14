package com.softtek.Controlador;

import com.softtek.Modelo.Actividades;
import com.softtek.Modelo.Invitado;
import com.softtek.Servicio.IInvitadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/invitado")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorInvitado {

@Autowired
    private IInvitadoServicio iInvitadoServicio;

    @GetMapping
    public List<Invitado> obtenerProcuto() throws SQLException, ClassNotFoundException {
        return iInvitadoServicio.obtener();
    }

    @GetMapping("/{id}")
    public Invitado obtener1Procuto(@PathVariable(name = "id") Integer id) throws SQLException, ClassNotFoundException {
        return iInvitadoServicio.obtenerUno(id);
    }

    @PutMapping
    public Invitado  actualizar (@RequestBody Invitado  p) throws SQLException, ClassNotFoundException {
        return iInvitadoServicio.actualizar(p);
    }

    @PostMapping
    public Invitado  crear (@RequestBody Invitado  p) throws SQLException, ClassNotFoundException {
        return iInvitadoServicio.crear(p);
    }

    @DeleteMapping("/{id}")
    public void eliminar (@PathVariable int id) throws SQLException, ClassNotFoundException {
        iInvitadoServicio.delete(id);
    }


}
