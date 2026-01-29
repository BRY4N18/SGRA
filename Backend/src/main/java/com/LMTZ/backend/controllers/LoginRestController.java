package com.LMTZ.backend.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.LMTZ.backend.dtos.LoginDTO;
import com.LMTZ.backend.services.IUserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequiredArgsConstructor
@RequestMapping("/SGRA")
@SessionAttributes("dateUser")
public class LoginRestController {
    private final IUserService userSer;

    @PostMapping("/login")
    public LoginDTO postMethodName(
        @RequestBody LoginDTO loginRequest,
        HttpServletRequest request,
        HttpSession session,
        org.springframework.ui.Model model
    ) {
        
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        LoginDTO answerDto = userSer.Login(email, password);

        if(answerDto != null && answerDto.getSuccess()){
            request.setAttribute("ipOrigen", request.getRemoteAddr());
            session.setAttribute("role", answerDto.getRole());
            model.addAttribute("dateUser", answerDto);
        }

        return answerDto;
    }
    
}
