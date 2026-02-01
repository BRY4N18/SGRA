package com.LMTZ.backend.services;

import com.LMTZ.backend.dtos.LoginResponseDTO;

public interface IUserService {
    LoginResponseDTO login(String email, String password);
}
