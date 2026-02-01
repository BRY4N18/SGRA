package com.LMTZ.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LMTZ.backend.entities.UsersRoles;

public interface IUserRoleRepository  extends JpaRepository<UsersRoles,Integer>{
    Optional<UsersRoles> findFirstByUserId_UserIdAndStateTrueOrderByUserRolesIdAsc(Integer userId);

}
