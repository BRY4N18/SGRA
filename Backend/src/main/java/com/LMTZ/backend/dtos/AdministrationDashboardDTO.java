package com.LMTZ.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdministrationDashboardDTO {
    private Long assetRoles;
    private Long modulesWithPermissions;
    private Long inactiveAccounts;
}
