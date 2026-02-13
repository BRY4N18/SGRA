package com.LMTZ.backend.services.security;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.LMTZ.backend.repositories.SecurityProcRepository;

@Service
public class DbRoleService {

    private final SecurityProcRepository securityProcRepository;

    public DbRoleService(SecurityProcRepository securityProcRepository) {
        this.securityProcRepository = securityProcRepository;
    }

    @Transactional
    public void applyRoleForUser(Integer userId) {
        securityProcRepository.setLocalRoleByUser(userId);
    }
}
