package com.softtek.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(name = "Cliente")
public class Cliente implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "dni")
    private String dni;

    @Column(name = "Correo")
    private String correo;

    @Column(name = "Dirreccion")
    private String direccion;

    @Column(name = "Ciudad")
    private String ciudad;

    @Column(name = "Comunidad")
    private String comunidad;

    @Column(name = "codigo_postal")
    private String codigoPostal;

    @Column(name = "password")
    private String password;

    @Enumerated
    private Role role;

    @OneToMany(mappedBy = "clienteInvitado",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
    List<Invitado> invitados;

    @OneToMany(mappedBy = "clienteViaje",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.EAGER)
    List<Viajes> viajes;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return correo;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
