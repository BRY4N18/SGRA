package com.LMTZ.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.dtos.RoleDTO;
import com.LMTZ.backend.entities.RoleManagement;

@Repository
public interface IRoleManagementRepository extends JpaRepository<RoleManagement, Integer>{
    Optional<List<RoleDTO>> findByStateTrue(); // Listar roles con sus id
    Long countByStateTrue(); // Roles activos
    Long countByStateFalse(); // Roles inactivos
}
