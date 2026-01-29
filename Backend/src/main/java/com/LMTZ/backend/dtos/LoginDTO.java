package com.LMTZ.backend.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.annotation.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginDTO {
    private String email;

    private String password;

    private String message;

    @Nonnull
    private Boolean success;

    private String role;
}
