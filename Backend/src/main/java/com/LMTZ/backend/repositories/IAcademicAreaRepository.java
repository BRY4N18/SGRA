package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.AcademicArea;

@Repository
public interface IAcademicAreaRepository extends JpaRepository<AcademicArea, Integer> {
}
