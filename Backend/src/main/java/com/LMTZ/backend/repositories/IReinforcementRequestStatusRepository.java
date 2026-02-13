package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.ReinforcementRequestStatus;

@Repository
public interface IReinforcementRequestStatusRepository extends JpaRepository<ReinforcementRequestStatus, Integer> {
}
