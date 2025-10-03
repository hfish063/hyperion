package com.backend.demo.controllers;

import com.backend.demo.entities.UserBook;
import com.backend.demo.services.UserBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
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

    @PostMapping("/save")
    public UserBook saveUserBook(@RequestBody UserBook newUserBook) {
        return userBookService.saveUserBook(newUserBook);
    }
}
