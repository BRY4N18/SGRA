package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.RoleManagementModule;

@Repository
public interface IRoleManagementModuleRepository extends JpaRepository<RoleManagementModule, Integer> {
}
