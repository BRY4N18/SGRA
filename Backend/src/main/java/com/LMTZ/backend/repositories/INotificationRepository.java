package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.Notification;

@Repository
public interface INotificationRepository extends JpaRepository<Notification, Integer> {
}
