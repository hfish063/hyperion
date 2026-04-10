package com.backend.demo.controllers;

import com.backend.demo.entities.Edition;
import com.backend.demo.entities.ReadingListBook;
import com.backend.demo.services.ReadingListBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/list-books")
public class ReadingListBookController {
    private final ReadingListBookService readingListBookService;

    @Autowired
    public ReadingListBookController(ReadingListBookService readingListBookService) {
        this.readingListBookService = readingListBookService;
    }

    @GetMapping("/list/{listId}")
    public List<ReadingListBook> getAllByListId(@PathVariable("listId") Long listId) {
        return readingListBookService.findAllByListId(listId);
    }

    @GetMapping("/edition/{editionId}")
    public List<ReadingListBook> getAllByEditionId(@PathVariable("editionId") Long editionId) {
        return readingListBookService.findAllByEditionId(editionId);
    }

    @PostMapping("/save")
    public ReadingListBook saveReadingListBook(@RequestBody ReadingListBook newReadingListBook) {
        return readingListBookService.saveReadingListBook(newReadingListBook);
    }

    @PostMapping("/add/{listId}")
    public ReadingListBook addEditionToList(@PathVariable("listId") Long listId, @RequestBody Edition edition) {
        return readingListBookService.addEditionToList(listId, edition);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteReadingListBookById(@PathVariable("id") Long id) {
        readingListBookService.deleteReadingListBookById(id);
    }
}
