package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.WorkAreaTypes;

@Repository
public interface IWorkAreaTypesRepository extends JpaRepository<WorkAreaTypes, Integer> {
}
