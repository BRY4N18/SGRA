package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Registrations;

@Repository
public interface IRegistrationsRepository extends JpaRepository<Registrations, Integer> {
}
