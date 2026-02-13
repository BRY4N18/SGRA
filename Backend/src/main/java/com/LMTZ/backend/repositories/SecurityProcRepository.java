package com.LMTZ.backend.repositories;

import java.sql.Types;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

@Repository
public class SecurityProcRepository {

    private final SimpleJdbcCall spSetRoleByUser;

    public SecurityProcRepository(JdbcTemplate jdbcTemplate) {
        this.spSetRoleByUser = new SimpleJdbcCall(jdbcTemplate)
                .withSchemaName("seguridad")
                .withProcedureName("sp_set_role_by_user")
                .declareParameters(
                        new org.springframework.jdbc.core.SqlParameter("p_idusuario", Types.INTEGER)
                );
    }

    public void setLocalRoleByUser(Integer userId) {
        if (userId == null) return;

        MapSqlParameterSource in = new MapSqlParameterSource()
                .addValue("p_idusuario", userId);

        spSetRoleByUser.execute(in);
    }
}
