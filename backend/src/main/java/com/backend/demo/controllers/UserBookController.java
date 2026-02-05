package com.backend.demo.controllers;

import com.backend.demo.constants.ReadingStatus;
import com.backend.demo.entities.UserBook;
import com.backend.demo.services.UserBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class UserBookController {
    private final UserBookService userBookService;

    @Autowired
    public UserBookController(UserBookService userBookService) {
        this.userBookService = userBookService;
    }

    @GetMapping("/all")
    public List<UserBook> getAllUserBooks() {
        return userBookService.findAllUserBooks();
    }

    @GetMapping("/search/{id}")
    public UserBook getUserBookById(@PathVariable("id") Long id) {
        return userBookService.findUserBookById(id);
    }

    @PostMapping("/save")
    public UserBook saveUserBook(@RequestBody UserBook newUserBook) {
        return userBookService.saveUserBook(newUserBook);
    }

    @PutMapping("/update/status/{id}")
    public UserBook updateUserBookReadingStatus(@PathVariable("id") Long id, @RequestBody ReadingStatus newStatus) {
        return userBookService.updateUserBookStatus(id, newStatus);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserBookById(@PathVariable("id") Long id) {
        userBookService.deleteUserBookById(id);
    }
}
