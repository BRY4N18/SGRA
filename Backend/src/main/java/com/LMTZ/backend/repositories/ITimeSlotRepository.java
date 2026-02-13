package com.LMTZ.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.LMTZ.backend.entities.TimeSlot;

@Repository
public interface ITimeSlotRepository extends JpaRepository<TimeSlot, Integer> {
}
