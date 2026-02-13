package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Parallel;

@Repository
public interface IParallelRepository extends JpaRepository<Parallel, Integer> {
}
