package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.ClassSchedule;

@Repository
public interface IClassScheduleRepository extends JpaRepository<ClassSchedule, Integer> {
}
