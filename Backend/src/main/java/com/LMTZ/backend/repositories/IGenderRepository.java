package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Gender;

@Repository
public interface IGenderRepository extends JpaRepository<Gender, Integer> {
}
