package com.backend.demo.controllers;

import com.backend.demo.entities.ReadingGoal;
import com.backend.demo.services.ReadingGoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class ReadingGoalController {
    private final ReadingGoalService readingGoalService;

    @Autowired
    public ReadingGoalController(ReadingGoalService readingGoalService) {
        this.readingGoalService = readingGoalService;
    }

    @GetMapping("/all")
    public List<ReadingGoal> getAllReadingGoals() {
        return readingGoalService.findAllReadingGoals();
    }

    @GetMapping("/{id}")
    public ReadingGoal getReadingGoalById(@PathVariable("id") Long id) {
        return readingGoalService.findReadingGoalById(id);
    }

    @PostMapping("/save")
    public ReadingGoal saveReadingGoal(@RequestBody ReadingGoal newReadingGoal) {
        return readingGoalService.saveReadingGoal(newReadingGoal);
    }

    @PatchMapping("/update/progress/{id}")
    public ReadingGoal updateReadingGoalProgress(@PathVariable("id") Long id, @RequestBody int progress) {
        return readingGoalService.updateReadingGoalProgress(id, progress);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReadingGoalById(@PathVariable("id") Long id) {
        readingGoalService.deleteReadingGoalById(id);
    }
}
