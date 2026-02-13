package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Students;

@Repository
public interface IStudentsRepository extends JpaRepository<Students, Integer> {
}
