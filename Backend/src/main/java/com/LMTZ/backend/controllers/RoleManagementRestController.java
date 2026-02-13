package com.LMTZ.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.LMTZ.backend.dtos.AdministrationDashboardDTO;
import com.LMTZ.backend.dtos.RoleDTO;
import com.LMTZ.backend.services.IGRoleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/role")
@RequiredArgsConstructor
public class RoleManagementRestController {
    private final IGRoleService igroleser;

    @GetMapping("/dashboard/stats")
    public ResponseEntity<AdministrationDashboardDTO> getAdministrationDashboard() {
        AdministrationDashboardDTO stats = igroleser.getAdministrationDashboardDTO();
        return new ResponseEntity<>(stats, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<RoleDTO>> getActiveRoles() {
        List<RoleDTO> roles = igroleser.getActiveRoles();
        if (roles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
}
