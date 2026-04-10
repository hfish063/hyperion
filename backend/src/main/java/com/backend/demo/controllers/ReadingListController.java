package com.backend.demo.controllers;

import com.backend.demo.entities.ReadingList;
import com.backend.demo.services.ReadingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
public class ReadingListController {
    private final ReadingListService readingListService;

    @Autowired
    public ReadingListController(ReadingListService readingListService) {
        this.readingListService = readingListService;
    }

    @GetMapping("/all")
    public List<ReadingList> getAllReadingLists() {
        return readingListService.findAllReadingLists();
    }

    @GetMapping("/{id}")
    public ReadingList getReadingListById(@PathVariable("id") Long id) {
        return readingListService.findReadingListById(id);
    }

    @PostMapping("/save")
    public ReadingList saveReadingList(@RequestBody ReadingList newReadingList) {
        return readingListService.saveReadingList(newReadingList);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReadingListById(@PathVariable("id") Long id) {
        readingListService.deleteReadingListById(id);
    }
}
