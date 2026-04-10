package com.backend.demo.controllers;

import com.backend.demo.constants.ReadingStatus;
import com.backend.demo.entities.LibraryBook;
import com.backend.demo.services.LibraryBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class LibraryBookController {
    private final LibraryBookService libraryBookService;

    @Autowired
    public LibraryBookController(LibraryBookService libraryBookService) {
        this.libraryBookService = libraryBookService;
    }

    @GetMapping("/all")
    public List<LibraryBook> getAllUserBooks() {
        return libraryBookService.findAllUserBooks();
    }

    @GetMapping("/all/status/{status}")
    public List<LibraryBook> getAllUserBooksByReadingStatus(@PathVariable("status") ReadingStatus status,
                                                            @RequestParam(required = false) Integer limit) {
        List<LibraryBook> results = libraryBookService.findAllUserBooksByReadingStatus(status);

        int end = (limit == null) ? results.size() : Math.min(limit, results.size());

        if (end <= 0) {
            return new ArrayList<>();
        }

        return new ArrayList<>(results.subList(0, end));
    }

    @GetMapping("/search/{id}")
    public LibraryBook getUserBookById(@PathVariable("id") Long id) {
        return libraryBookService.findUserBookById(id);
    }

    @PostMapping("/save")
    public LibraryBook saveUserBook(@RequestBody LibraryBook newLibraryBook) {
        return libraryBookService.saveUserBook(newLibraryBook);
    }

    @PostMapping("/save/input")
    public LibraryBook saveUserBookWithInput(@RequestBody LibraryBook newLibraryBook) {
        return libraryBookService.saveUserBookWithInput(newLibraryBook);
    }

    @PutMapping("/update/status/{id}")
    public LibraryBook updateUserBookReadingStatus(@PathVariable("id") Long id, @RequestBody ReadingStatus newStatus) {
        return libraryBookService.updateUserBookStatus(id, newStatus);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserBookById(@PathVariable("id") Long id) {
        libraryBookService.deleteUserBookById(id);
    }

    @DeleteMapping("/delete/all/edition/ids")
    public void deleteAllUserBooksByEditionIds(@RequestBody List<Long> editionIds) {
        libraryBookService.deleteAllUserBooksByEditionIds(editionIds);
    }
}
