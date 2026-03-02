package com.backend.demo.external.hardcover.controllers;

import com.backend.demo.entities.Book;
import com.backend.demo.entities.Edition;
import com.backend.demo.services.BookService;
import com.backend.demo.services.EditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/meta/")
@CrossOrigin(origins = "http://localhost:3000")
public class EditionController {
    private final EditionService editionService;
    private final BookService bookService;

    @Autowired
    public EditionController(EditionService editionService, BookService bookService) {
        this.editionService = editionService;
        this.bookService = bookService;
    }

    @GetMapping("search/books/title/{title}")
    public List<Book> getBooksByTitle(@PathVariable("title") String title) {
        return bookService.findAllBooksByTitle(title);
    }

    @GetMapping("search/title/{title}")
    public List<Edition> getEditionsByTitle(@PathVariable("title") String title,
                                            @RequestParam(required = false) Integer limit,
                                            @RequestParam(defaultValue = "0") int offset) throws IOException {
        List<Edition> results = editionService.findAllEditionsByTitle(title);

        // apply offset and limit rules to response
        if (offset >= results.size()) {
            return new ArrayList<>(Collections.emptyList());
        }

        int end = limit == null ? results.size() : Math.min(offset + limit, results.size());

        return results.subList(offset, end);
    }

    @GetMapping("search/id/{id}")
    public Edition getEditionById(@PathVariable("id") String id) {
        return editionService.findEditionBySourceId(id);
    }

    @GetMapping("search/isbn/{isbn}")
    public Edition getEditionByIsbn(@PathVariable("isbn") String isbn) {
        return editionService.findEditionByIsbn(isbn);
    }
}
