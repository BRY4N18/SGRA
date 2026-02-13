package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Modality;

@Repository
public interface IModalityRepository extends JpaRepository<Modality, Integer> {
}
