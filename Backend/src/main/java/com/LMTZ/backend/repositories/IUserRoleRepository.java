package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.LMTZ.backend.entities.UsersRoles;

public interface IUserRoleRepository  extends JpaRepository<UsersRoles,Integer>{

}
