package com.example.backend.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tbdocentes")
public class Teaching {
    @Id
    @Column(name = "iddocente")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer teachingId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idusuario", foreignKey = @ForeignKey(name = "fk_docentes_usuarios"))
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idmodalidad", foreignKey = @ForeignKey(name = "fk_docentes_modalidades"))
    private Modality modalityId;

    @Column(name = "estado", nullable = false, columnDefinition = "boolean default true")
    private Boolean state = true;

    @OneToMany(mappedBy = "teacherId", fetch = FetchType.LAZY)
    private List<Class> classes;

    @OneToMany(mappedBy = "teacherId", fetch = FetchType.LAZY)
    private List<TeacherAvailability> teacherAvailabilities;

    @OneToMany(mappedBy = "teacherId", fetch = FetchType.LAZY)
    private List<ReinforcementRequest> reinforcementRequests;
}
