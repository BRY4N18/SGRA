package com.LMTZ.backend.services.impl;
import java.util.List;
import java.util.Map; // Necesario para recibir los OUT parameters del SP
import java.util.stream.Collectors;

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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GRoleServiceImpl implements IGRoleService{
    private final IRoleManagementRepository roleManagementRepo;
    private final IUserManagementRepository userManagementRepo;
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

    // --- MÉTODOS NUEVOS (SP) ---

    @Override
    @Transactional(readOnly = true)
    public List<PermisoEsquemaDTO> listarPermisosDeRol(String nombreRol) {
        List<Object[]> resultadosCrudos = roleManagementRepo.llamarSpPermisos(nombreRol);
        return resultadosCrudos.stream().map(fila -> new PermisoEsquemaDTO(
                (String) fila[0],
                (String) fila[1],
                (String) fila[2]
        )).collect(Collectors.toList());
    }

    @Override
    // SIN @Transactional (El SP maneja su propio COMMIT/ROLLBACK)
    public RoleResponseDTO crearNuevoRol(RoleCreateDTO request) {

        // ACTUALIZADO: Solo enviamos nombre y descripción.
        // La DB se encarga del nombre interno 'role_xxx'.
        Map<String, Object> resultado = roleManagementRepo.crearRol(
                request.getNombreRol(),
                request.getDescripcion()
        );

        String mensaje = (String) resultado.get("p_mensaje");
        Boolean exito = (Boolean) resultado.get("p_exito");

        return new RoleResponseDTO(mensaje, exito);
    }
}
