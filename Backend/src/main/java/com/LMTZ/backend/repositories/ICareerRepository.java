package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Career;

@Repository
public interface ICareerRepository extends JpaRepository<Career, Integer> {
}
