package com.LMTZ.backend.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtil {
    private SecurityUtil() {}

    public static Integer getCurrentUserIdOrNull() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) return null;

        Object details = auth.getDetails();
        if (details instanceof Integer i) return i;

        if (details instanceof Number n) return n.intValue(); // 👈 recomendado

        if (details instanceof String s) {
            try { return Integer.valueOf(s); } catch (Exception ignore) {}
        }
        return null;
    }
}
