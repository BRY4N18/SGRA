package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.NotificationChannels;

@Repository
public interface INotificationChannelsRepository extends JpaRepository<NotificationChannels, Integer> {
}
