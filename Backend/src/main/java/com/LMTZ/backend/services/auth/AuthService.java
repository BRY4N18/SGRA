package com.LMTZ.backend.services.auth;

import java.util.Locale;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.LMTZ.backend.dtos.AuthLoginRequest;
import com.LMTZ.backend.dtos.AuthLoginResponse;
import com.LMTZ.backend.entities.Access;
import com.LMTZ.backend.entities.UsersRoles;
import com.LMTZ.backend.repositories.IAccessRepository;
import com.LMTZ.backend.repositories.IUserRoleRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final IAccessRepository accessRepository;
    private final IUserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final JdbcTemplate jdbcTemplate;

    private boolean cuentaActivaColumnPresent = false;

    @PostConstruct
    void init() {
        cuentaActivaColumnPresent = checkCuentaActivaColumn();
    }

    @Transactional(readOnly = true)
    public AuthLoginResponse login(AuthLoginRequest request) {
        Access access = accessRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Credenciales inválidas"));

        if (cuentaActivaColumnPresent) {
            Boolean active = jdbcTemplate.queryForObject(
                    "select cuenta_activa from sgra.tbaccesos where nombreusuario = ?",
                    Boolean.class,
                    access.getUsername());
            if (active != null && !active) {
                throw new AccountInactiveException("Cuenta inactiva. Contacta al administrador.");
            }
        }

        if (!passwordMatches(access.getPassword(), request.getPassword())) {
            throw new BadCredentialsException("Credenciales inválidas");
        }

        String role = resolveRole(access.getUser().getUserId());
        String token = jwtService.generateToken(access.getUsername(), access.getUser().getUserId(), role);

        return new AuthLoginResponse(token, role, access.getUser().getUserId(), access.getUsername());
    }

    private boolean passwordMatches(String storedPassword, String rawPassword) {
        if (storedPassword == null || rawPassword == null) {
            return false;
        }
        if (isBcryptHash(storedPassword)) {
            return passwordEncoder.matches(rawPassword, storedPassword);
        }
        // Temporal: datos de prueba en texto plano; se compara directo hasta migrar a BCrypt.
        return storedPassword.equals(rawPassword);
    }

    private boolean isBcryptHash(String password) {
        return password.startsWith("$2a$") || password.startsWith("$2b$") || password.startsWith("$2y$");
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
        if (normalized.contains("estudiante") || normalized.contains("student")) {
            return "STUDENT";
        }
        if (normalized.contains("docente") || normalized.contains("teacher")) {
            return "TEACHER";
        }
        if (normalized.contains("coordinador") || normalized.contains("coordinator")) {
            return "COORDINATOR";
        }
        if (normalized.contains("admin")) {
            return "ADMIN";
        }
        return role.trim().toUpperCase(Locale.ROOT);
    }

    private boolean checkCuentaActivaColumn() {
        try {
            Integer count = jdbcTemplate.queryForObject(
                    "select count(*) from information_schema.columns where table_schema = ? and table_name = ? and column_name = ?",
                    Integer.class,
                    "sgra",
                    "tbaccesos",
                    "cuenta_activa");
            return count != null && count > 0;
        } catch (Exception ex) {
            return false;
        }
    }
}
