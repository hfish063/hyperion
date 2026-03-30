package com.backend.demo.services;

import com.backend.demo.entities.ReadingGoal;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.ReadingGoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReadingGoalService {
    private final ReadingGoalRepository readingGoalRepository;

    @Autowired
    public ReadingGoalService(ReadingGoalRepository readingGoalRepository) {
        this.readingGoalRepository = readingGoalRepository;
    }

    public List<ReadingGoal> findAllReadingGoals() {
        return readingGoalRepository.findAll();
    }

    public ReadingGoal findReadingGoalById(Long id) {
        Optional<ReadingGoal> result = readingGoalRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find reading goal with id: " + id);
        }
        return result.get();
    }

    public ReadingGoal saveReadingGoal(ReadingGoal newReadingGoal) {
        return readingGoalRepository.save(newReadingGoal);
    }

    public ReadingGoal updateReadingGoalProgress(Long id, int progress) {
        ReadingGoal goal = findReadingGoalById(id);
        goal.setProgress(progress);
        return readingGoalRepository.save(goal);
    }

    public void deleteReadingGoalById(Long id) {
        Optional<ReadingGoal> result = readingGoalRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find reading goal with id: " + id);
        }
        readingGoalRepository.deleteById(id);
    }
}
