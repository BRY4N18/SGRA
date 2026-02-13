package com.LMTZ.backend.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.LMTZ.backend.dtos.AdministrationDashboardDTO;
import com.LMTZ.backend.dtos.RoleDTO;
//import com.LMTZ.backend.repositories.IModuleManagementRepository;
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

    public AdministrationDashboardDTO getAdministrationDashboardDTO(){
        AdministrationDashboardDTO adminDashDto = null;
        adminDashDto.setAssetRoles(roleManagementRepo.countByStateTrue());
        adminDashDto.setInactiveAccounts(userManagementRepo.countByStateFalse());
        //adminDashDto.setModulesWithPermissions(moduleManagementRepo);
        return adminDashDto;
    }

    public List<RoleDTO> getActiveRoles(){
        return roleManagementRepo.findByStateTrue().orElse(null);
    }
}
