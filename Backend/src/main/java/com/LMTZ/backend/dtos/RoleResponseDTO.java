package com.LMTZ.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleResponseDTO {
    private String mensaje;
    private Boolean exito;
}