package com.backend.demo.services;

import com.backend.demo.entities.Book;
import com.backend.demo.external.openlibrary.OpenLibraryClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final OpenLibraryClient openLibraryClient;

    @Autowired
    public BookService(OpenLibraryClient openLibraryClient) {
        this.openLibraryClient = openLibraryClient;
    }

    public List<Book> findAllBooksByTitle(String title) {
        return null;
    }
}
