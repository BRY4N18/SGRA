package com.LMTZ.backend.services;

import java.util.List;

import com.LMTZ.backend.dtos.AdministrationDashboardDTO;
import com.LMTZ.backend.dtos.RoleDTO;

public interface IGRoleService {
    AdministrationDashboardDTO getAdministrationDashboardDTO(); // Metricas del dashboard

    List<RoleDTO> getActiveRoles(); //Listar roles activos
}
