package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Preference;

@Repository
public interface IPreferenceRepository extends JpaRepository<Preference, Integer> {
}
