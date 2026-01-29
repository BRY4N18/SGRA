package com.LMTZ.backend.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.LMTZ.backend.dtos.LoginDTO;
import com.LMTZ.backend.entities.Access;
import com.LMTZ.backend.entities.User;
import com.LMTZ.backend.repositories.IAccessRepository;
import com.LMTZ.backend.repositories.IUserRepository;
import com.LMTZ.backend.services.IUserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final IUserRepository userRepo;
    private final IAccessRepository accessRepo;

    @Override
    @Transactional(readOnly = true)
    public LoginDTO Login(String email, String password) {

        LoginDTO answerDto = new LoginDTO();
        Access accessCredentials = null;

        Optional<User> user = userRepo.findByEmail(email);

        if(user.isPresent()){
            accessCredentials = accessRepo.findByUser_UserId(user.get().getUserId()).orElse(null);
        }

        if(accessCredentials != null && accessCredentials.getPassword().equals(password)){
            answerDto.setSuccess(true);
            answerDto.setRole(user.get().getUsersRoles().getFirst().getRoleId().getRole());
            answerDto.setEmail(email);
            answerDto.setPassword(password);
        }
        else{
            answerDto.setSuccess(false);
            answerDto.setMessage("Credenciales incorrectas");
        }

        return answerDto;
    }
}
