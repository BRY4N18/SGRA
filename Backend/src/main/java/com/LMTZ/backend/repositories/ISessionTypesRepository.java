package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.SessionTypes;

@Repository
public interface ISessionTypesRepository extends JpaRepository<SessionTypes, Integer> {
}
