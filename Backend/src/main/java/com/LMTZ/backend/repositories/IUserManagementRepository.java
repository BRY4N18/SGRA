package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.UserManagement;

@Repository
public interface IUserManagementRepository extends JpaRepository<UserManagement, Integer> {
    Long countByEstadoFalse(); // Cuentas inactivas
}
