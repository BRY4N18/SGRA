package com.LMTZ.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "tbfranjashorarias")
public class TimeSlot {
    @Id
    @Column(name = "idfranjahoraria")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Integer timeSlotId;

    @Column(name = "horainicio", nullable = false, columnDefinition = "time")
    private LocalTime startTime;

    @Column(name = "horariofin", nullable = false, columnDefinition = "time")
    private LocalTime endTime;

    @Column(name = "estado", nullable = false, columnDefinition = "boolean default true")
    private Boolean state = true;

    @OneToMany(mappedBy = "timeSlotId", fetch = FetchType.LAZY)
    private List<ClassSchedule> classSchedules;

    @OneToMany(mappedBy = "timeSlotId", fetch = FetchType.LAZY)
    private List<TeacherAvailability> teacherAvailabilities;

    @OneToMany(mappedBy = "timeSlotId", fetch = FetchType.LAZY)
    private List<ReinforcementRequest> reinforcementRequests;

    @OneToMany(mappedBy = "timeSlotId", fetch = FetchType.LAZY)
    private List<ScheduledReinforcement> scheduledReinforcements;
}
