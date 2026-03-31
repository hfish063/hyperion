package com.backend.demo.repositories;

import com.backend.demo.entities.ReadingGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReadingGoalRepository extends JpaRepository<ReadingGoal, Long> {
}
