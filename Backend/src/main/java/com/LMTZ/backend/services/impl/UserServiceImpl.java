package com.LMTZ.backend.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.LMTZ.backend.dtos.LoginResponseDTO;
import com.LMTZ.backend.entities.Access;
import com.LMTZ.backend.entities.User;
import com.LMTZ.backend.repositories.IAccessRepository;
import com.LMTZ.backend.repositories.IUserRepository;
import com.LMTZ.backend.services.IUserService;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final IUserRepository userRepo;
    private final IAccessRepository accessRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public LoginResponseDTO login(String email, String password) {

        LoginResponseDTO answerDto = new LoginResponseDTO();
        Access accessCredentials = null;

        Optional<User> user = userRepo.findByEmail(email);

        if(user.isPresent()){
            accessCredentials = accessRepo.findByUserId(user.get().getUserId()).orElse(null);
        }

        if(accessCredentials != null && passwordMatches(accessCredentials.getPassword(), password)){
            answerDto.setSuccess(true);
            answerDto.setRole(user.get().getUsersRoles().getFirst().getRoleId().getRole());
            answerDto.setEmail(email);
        } else {
            answerDto.setSuccess(false);
            answerDto.setMessage("Credenciales incorrectas");
        }

        return answerDto;
    }

    private boolean passwordMatches(String storedPassword, String rawPassword) {
        if (storedPassword == null || rawPassword == null) {
            return false;
        }
        if (isBcryptHash(storedPassword)) {
            return passwordEncoder.matches(rawPassword, storedPassword);
        }
        return storedPassword.equals(rawPassword);
    }

    private boolean isBcryptHash(String password) {
        return password.startsWith("$2a$") || password.startsWith("$2b$") || password.startsWith("$2y$");
    }
}
