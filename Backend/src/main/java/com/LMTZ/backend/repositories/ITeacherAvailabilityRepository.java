package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.TeacherAvailability;

@Repository
public interface ITeacherAvailabilityRepository extends JpaRepository<TeacherAvailability, Integer> {
}
