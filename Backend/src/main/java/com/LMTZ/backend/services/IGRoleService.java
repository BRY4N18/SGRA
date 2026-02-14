package com.LMTZ.backend.services;

import java.util.List;

import com.LMTZ.backend.dtos.AdministrationDashboardDTO;
import com.LMTZ.backend.dtos.RoleDTO;

import com.LMTZ.backend.dtos.PermisoEsquemaDTO;
import com.LMTZ.backend.dtos.RoleCreateDTO;
import com.LMTZ.backend.dtos.RoleResponseDTO;

public interface IGRoleService {
    AdministrationDashboardDTO getAdministrationDashboardDTO(); // Metricas del dashboard

    List<RoleDTO> getActiveRoles(); //Listar roles activos

    // 1. Para listar los permisos (SP: sp_listar_permisos_esquemas)
    List<PermisoEsquemaDTO> listarPermisosDeRol(String nombreRol);

    // 2. Para crear un nuevo rol (SP: sp_in_creargrol)
    RoleResponseDTO crearNuevoRol(RoleCreateDTO request);
}
