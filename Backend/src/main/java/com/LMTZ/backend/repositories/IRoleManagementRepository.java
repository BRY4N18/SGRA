package com.LMTZ.backend.repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.dtos.RoleDTO;
import com.LMTZ.backend.entities.RoleManagement;

@Repository
public interface IRoleManagementRepository extends JpaRepository<RoleManagement, Integer> {

    // ---------------------------------------------------------
    // MÉTODOS EXISTENTES
    // ---------------------------------------------------------
    List<RoleDTO> findByStateTrue();
    Long countByStateTrue();
    Long countByStateFalse();

    // ---------------------------------------------------------
    // NUEVOS STORED PROCEDURES
    // ---------------------------------------------------------

    // 1. Listar Permisos (Sin cambios)
    @Procedure(procedureName = "sp_listar_permisos_esquemas")
    List<Object[]> llamarSpPermisos(@Param("p_nombre_rol") String nombreRol);

    // 2. Crear Rol (ACTUALIZADO)
    // - Eliminamos 'p_rolservidor'
    // - Agregamos el esquema 'seguridad.' al nombre
    @Procedure(procedureName = "seguridad.sp_in_creargrol")
    Map<String, Object> crearRol(
            @Param("p_grol") String grol,
            @Param("p_descripcion") String descripcion
    );
}