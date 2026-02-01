package com.LMTZ.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Access;

@Repository
public interface IAccessRepository extends JpaRepository<Access,Integer> {
    Optional<Access> findByUser_UserId(Integer userId);

    Optional<Access> findByUsername(String username);
}
