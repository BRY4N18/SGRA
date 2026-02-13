package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.UsersRoles;

@Repository
public interface IUsersRolesRepository extends JpaRepository<UsersRoles, Integer> {
}
