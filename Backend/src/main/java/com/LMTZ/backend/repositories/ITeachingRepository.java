package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Teaching;

@Repository
public interface ITeachingRepository extends JpaRepository<Teaching, Integer> {
}
