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


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Cliente")
public class Cliente implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "nombre", length = 50)
    private String nombre;

    @Column(name = "dni", length = 10)
    private String dni;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "direccion", length = 60)
    private String direccion;

    @Column(name = "ciudad", length = 50)
    private String ciudad;

    @Column(name = "comunidad", length = 50)
    private String comunidad;

    @Column(name = "codigo_postal", length = 6)
    private String codigoPostal;

<<<<<<< HEAD
    @Column(name = "password")
=======
    @Column(name = "password", length = 50)
>>>>>>> 64e8c6037d3eb80c591fc40ad2f734aca50e649a
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
        return email;
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
