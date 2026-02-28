package com.backend.demo.external.openlibrary.controllers;

import com.backend.demo.external.openlibrary.OpenLibraryClient;
import com.backend.demo.external.openlibrary.dtos.OpenLibraryDoc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookController {
    private final OpenLibraryClient openLibraryClient;

    @Autowired
    public BookController(OpenLibraryClient openLibraryClient) {
        this.openLibraryClient = openLibraryClient;
    }

    @GetMapping("/search/title/{title}")
    public List<OpenLibraryDoc> findAllBooksByTitle(@PathVariable("title") String title) {
        return openLibraryClient.searchWorksByTitle(title);
    }
}
