package com.LMTZ.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PermisoEsquemaDTO {
    private String nombreEsquema;
    private String nombreRol;
    private String permisos;
}
