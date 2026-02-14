package com.LMTZ.backend.services.impl;
import java.util.List;
import java.util.Map; // Necesario para recibir los OUT parameters del SP
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Importante para el cursor

import com.LMTZ.backend.dtos.AdministrationDashboardDTO;
import com.LMTZ.backend.dtos.RoleDTO;
// Importamos tus nuevos DTOs
import com.LMTZ.backend.dtos.PermisoEsquemaDTO;
import com.LMTZ.backend.dtos.RoleCreateDTO;
import com.LMTZ.backend.dtos.RoleResponseDTO;

import com.LMTZ.backend.repositories.IRoleManagementRepository;
import com.LMTZ.backend.repositories.IUserManagementRepository;
import com.LMTZ.backend.services.IGRoleService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GRoleServiceImpl implements IGRoleService{
    private final IRoleManagementRepository roleManagementRepo;
    private final IUserManagementRepository userManagementRepo;
    private final EntityManager entityManager;
    //private final IModuleManagementRepository moduleManagementRepo;

    @Override
    public AdministrationDashboardDTO getAdministrationDashboardDTO(){
        AdministrationDashboardDTO adminDashDto = new AdministrationDashboardDTO();
        adminDashDto.setAssetRoles(roleManagementRepo.countByStateTrue());
        adminDashDto.setInactiveAccounts(userManagementRepo.countByStateFalse());
        //adminDashDto.setModulesWithPermissions(moduleManagementRepo);
        adminDashDto.setModulesWithPermissions(0L);
        return adminDashDto;
    }

    @Override
    public List<RoleDTO> getActiveRoles() {
    return roleManagementRepo.findByStateTrue().stream()
        .map(role -> new RoleDTO(role.getRoleId(), role.getRole())) 
        .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PermisoEsquemaDTO> listarPermisosDeRol(String nombreRol) {
        StoredProcedureQuery query = entityManager.createStoredProcedureQuery("seguridad.sp_sl_permisosesquemas_rol");
        query.registerStoredProcedureParameter("p_nombre_rol", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("p_cursor", void.class, ParameterMode.REF_CURSOR);
        query.setParameter("p_nombre_rol", nombreRol);
        query.execute();

        @SuppressWarnings("unchecked")
        List<Object[]> resultadosCrudos = query.getResultList();

        return resultadosCrudos.stream().map(fila -> new PermisoEsquemaDTO(
                (String) fila[0],
                (String) fila[1],
                (String) fila[2]
        )).collect(Collectors.toList());
    }

    @Override
    public RoleResponseDTO crearNuevoRol(RoleCreateDTO request) {

        Map<String, Object> resultado = roleManagementRepo.crearRol(
                request.getNombreRol(),
                request.getDescripcion()
        );

        String mensaje = (String) resultado.get("p_mensaje");
        Boolean exito = (Boolean) resultado.get("p_exito");

        return new RoleResponseDTO(mensaje, exito);
    }
}
