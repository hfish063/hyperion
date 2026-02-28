package com.backend.demo.external.openlibrary.controllers;

import com.backend.demo.external.openlibrary.OpenLibraryClient;
import com.backend.demo.external.openlibrary.dtos.OpenLibraryDoc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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
