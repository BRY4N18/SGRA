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

    List<RoleDTO> findByStateTrue();
    Long countByStateTrue();
    Long countByStateFalse();

    @Procedure(procedureName = "seguridad.sp_sl_permisosesquemas_rol")
    List<Object[]> llamarSpPermisos(@Param("p_nombre_rol") String nombreRol);

    @Procedure(procedureName = "seguridad.sp_in_creargrol")
    Map<String, Object> crearRol(
            @Param("p_grol") String grol,
            @Param("p_descripcion") String descripcion
    );
}