package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.VirtualPlatform;

@Repository
public interface IVirtualPlatformRepository extends JpaRepository<VirtualPlatform, Integer> {
}
