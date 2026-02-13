package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.ScheduledReinforcement;

@Repository
public interface IScheduledReinforcementRepository extends JpaRepository<ScheduledReinforcement, Integer> {
}
