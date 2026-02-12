package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.ModuleManagement;

@Repository
public interface IModuleManagementRepository extends JpaRepository<ModuleManagement,Integer> {

}
