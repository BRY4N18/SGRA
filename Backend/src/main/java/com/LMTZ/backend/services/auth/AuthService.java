package com.LMTZ.backend.services.auth;

import java.util.Locale;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.LMTZ.backend.dtos.AuthLoginRequest;
import com.LMTZ.backend.dtos.AuthLoginResponse;
import com.LMTZ.backend.entities.Access;
import com.LMTZ.backend.entities.UsersRoles;
import com.LMTZ.backend.repositories.IAccessRepository;
import com.LMTZ.backend.repositories.IUserRoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final IAccessRepository accessRepository;
    private final IUserRoleRepository userRoleRepository;
    private final JwtService jwtService;

    @Transactional(readOnly = true)
    public AuthLoginResponse login(AuthLoginRequest request) {

        Access access = accessRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));

        Boolean activa = access.getState();
        if (activa != null && !activa) {
            throw new AccountInactiveException("Cuenta inactiva. Contacta al administrador.");
        }

        if (!passwordMatches(access.getPassword(), request.getPassword())) {
            throw new BadCredentialsException("Credenciales inválidas");
        }

        Integer userId = access.getUser().getUserId();
        String role = resolveRole(userId);

        String token = jwtService.generateToken(access.getUsername(), userId, role);

        return new AuthLoginResponse(token, role, userId, access.getUsername());
    }

    private boolean passwordMatches(String storedPassword, String rawPassword) {
        if (storedPassword == null || rawPassword == null) return false;

        if (storedPassword.startsWith("$2a$") || storedPassword.startsWith("$2b$") || storedPassword.startsWith("$2y$")) {
            return BCrypt.checkpw(rawPassword, storedPassword);
        }

        return storedPassword.equals(rawPassword);
    }

    private String resolveRole(Integer userId) {
        UsersRoles userRole = userRoleRepository
                .findFirstByUserId_UserIdAndStateTrueOrderByUserRolesIdAsc(userId)
                .orElse(null);

        if (userRole == null || userRole.getRoleId() == null || userRole.getRoleId().getRole() == null) {
            return "STUDENT";
        }
        return normalizeRole(userRole.getRoleId().getRole());
    }

    private String normalizeRole(String role) {
        String normalized = role.trim().toLowerCase(Locale.ROOT);

        if (normalized.contains("estudiante") || normalized.contains("student")) return "STUDENT";
        if (normalized.contains("docente") || normalized.contains("teacher")) return "TEACHER";
        if (normalized.contains("coordinador") || normalized.contains("coordinator")) return "COORDINATOR";
        if (normalized.contains("admin")) return "ADMIN";

        return role.trim().toUpperCase(Locale.ROOT);
    }
}
