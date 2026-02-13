package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Class;

@Repository
public interface IClassRepository extends JpaRepository<Class, Integer> {
}
