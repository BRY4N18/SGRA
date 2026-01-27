package com.example.backend.entities;

import java.util.List;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tbusuarios")
public class User {
    @Id
    @Column(name = "idusuario")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer userId;

    @Column(name = "nombres", length = 100, nullable = false)
    private String firstName;

    @Column(name = "apellidos", length = 100, nullable = false)
    private String lastName;

    @Column(name = "identificador", length = 13, nullable = false, unique = true)
    private String identification;

    @Column(name = "telefono", length = 10, nullable = false, columnDefinition = "char(10)", unique = true)
    private String phoneNumber;

    @Column(name = "correo", length = 200, nullable = false, unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idinstitucion", foreignKey = @ForeignKey(name = "fk_usuario_institucion"))
    private Institution institutionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idgenero", foreignKey = @ForeignKey(name = "fk_usuario_genero"))
    private Gender idGender;

    @Column(name = "direccion", length = 200, nullable = false)
    private String address;

    @OneToOne(mappedBy = "userId", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Access access;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<UsersRoles> usersRoles;

    @OneToOne(mappedBy = "userId", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Students student;

    @OneToOne(mappedBy = "userId", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Teaching teaching;

    @OneToOne(mappedBy = "userId", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Coordination coordination;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<Preference> preferences;

    @OneToMany(mappedBy = "userId", fetch = FetchType.LAZY)
    private List<Notification> notifications;
}
