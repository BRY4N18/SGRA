package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.ReinforcementPerformed;

@Repository
public interface IReinforcementPerformedRepository extends JpaRepository<ReinforcementPerformed, Integer> {
}
