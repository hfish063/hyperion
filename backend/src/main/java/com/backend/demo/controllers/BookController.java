package com.backend.demo.controllers;

import com.backend.demo.entities.Book;
import com.backend.demo.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/search/title/{title}")
    public List<Book> findAllBooksByTitle(@PathVariable("title") String title) {
        return bookService.findAllBooksByTitle(title);
    }
}
