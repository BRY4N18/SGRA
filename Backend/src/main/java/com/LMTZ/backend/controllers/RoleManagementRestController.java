package com.LMTZ.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // Importamos PostMapping, PathVariable, RequestBody, etc.

// Importamos tus DTOs existentes y los nuevos
import com.LMTZ.backend.dtos.AdministrationDashboardDTO;
import com.LMTZ.backend.dtos.RoleDTO;
import com.LMTZ.backend.dtos.PermisoEsquemaDTO;
import com.LMTZ.backend.dtos.RoleCreateDTO;
import com.LMTZ.backend.dtos.RoleResponseDTO;

import com.LMTZ.backend.services.IGRoleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/role")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
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

    @GetMapping("/admin/permissions/{nombreRol}")
    public ResponseEntity<List<PermisoEsquemaDTO>> getRolePermissions(@PathVariable String nombreRol) {
        List<PermisoEsquemaDTO> permisos = igroleser.listarPermisosDeRol(nombreRol);
        if (permisos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(permisos, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<RoleResponseDTO> createRole(@RequestBody RoleCreateDTO request) {
        RoleResponseDTO response = igroleser.crearNuevoRol(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
