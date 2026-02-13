package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Institution;

@Repository
public interface IInstitutionRepository extends JpaRepository<Institution, Integer> {
}
