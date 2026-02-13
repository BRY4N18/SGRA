package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Subject;

@Repository
public interface ISubjectRepository extends JpaRepository<Subject, Integer> {
}
