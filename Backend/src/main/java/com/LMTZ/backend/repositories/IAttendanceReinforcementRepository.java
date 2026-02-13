package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.AttendanceReinforcement;

@Repository
public interface IAttendanceReinforcementRepository extends JpaRepository<AttendanceReinforcement, Integer> {
}
