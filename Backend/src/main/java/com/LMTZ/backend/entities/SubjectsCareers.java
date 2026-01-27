package com.example.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "tbasignaturacarreras")
public class SubjectsCareers {
    @Id
    @Column(name = "idasignaturacarrera")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer subjectCareerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idasignatura", foreignKey = @ForeignKey(name = "fk_asignaturacarrera_asignatura"))
    private Subject subjectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idcarrera", foreignKey = @ForeignKey(name = "fk_asignatiracarrera_carrera"))
    private Career careerId;
}
