package com.LMTZ.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Role;

@Repository
public interface IRoleRepository extends JpaRepository<Role,Integer>{
    Optional<Role> findByRole(String role);
}
