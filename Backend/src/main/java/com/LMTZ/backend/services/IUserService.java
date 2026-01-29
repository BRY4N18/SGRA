package com.LMTZ.backend.services;

import com.LMTZ.backend.dtos.LoginDTO;

public interface IUserService {
    LoginDTO Login(String email, String password);
}
