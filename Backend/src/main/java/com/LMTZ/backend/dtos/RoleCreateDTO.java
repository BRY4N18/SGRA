package com.LMTZ.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleCreateDTO {
    private String nombreRol;      // p_grol
    private String descripcion;    // p_descripcion
}