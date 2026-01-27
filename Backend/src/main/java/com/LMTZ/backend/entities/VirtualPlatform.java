package com.example.backend.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@Entity
@Table(name="tbplataformavirtual")
public class VirtualPlatform {
    @Id
    @Column(name = "idplataformavirtual")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer virtualPlataformId;

    @Column(name = "plataformavirtual", length = 30, nullable = false, unique = true)
    private String virtualPlataform;

    @Column(name = "estado", nullable = false, columnDefinition = "boolean default true")
    private Boolean state = true;

    @OneToMany(mappedBy = "virtualPlatformId", fetch = FetchType.LAZY)
    private List<ScheduledReinforcement> scheduledReinforcements;
}
