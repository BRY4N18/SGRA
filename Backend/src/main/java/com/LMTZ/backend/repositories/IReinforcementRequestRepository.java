package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.ReinforcementRequest;

@Repository
public interface IReinforcementRequestRepository extends JpaRepository<ReinforcementRequest, Integer> {
}
