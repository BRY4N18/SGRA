package com.LMTZ.backend.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.LMTZ.backend.services.security.DbRoleService;
import com.LMTZ.backend.utils.SecurityUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class DbRoleInterceptor implements HandlerInterceptor {

    private final DbRoleService dbRoleService;

    public DbRoleInterceptor(DbRoleService dbRoleService) {
        this.dbRoleService = dbRoleService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        String path = request.getRequestURI();

        // excluye endpoints públicos / auth / debug
        if (path.startsWith("/api/public")) return true;
        if (path.startsWith("/api/auth")) return true;

        Integer userId = SecurityUtil.getCurrentUserIdOrNull();

        // Aplica rol BD para este request (SET LOCAL ROLE dentro de transacción)
        if (userId != null) {
            dbRoleService.applyRoleForUser(userId);
        }

        return true;
    }
}
