package com.backend.demo.services;

import com.backend.demo.entities.Book;
import com.backend.demo.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    private final ExternalService externalBookService;
    private final BookRepository bookRepository;

    @Autowired
    public BookService(ExternalService externalBookService, BookRepository bookRepository) {
        this.externalBookService = externalBookService;
        this.bookRepository = bookRepository;
    }

    public List<Book> findAllBooksByTitle(String title, String apiToken) {
        List<Book> storedBooks = bookRepository.findAllByTitle(title);

        if (!storedBooks.isEmpty()) {
            return storedBooks;
        }

        List<Book> externalBooks = externalBookService.doExternalBookSearch(title, apiToken);
        List<Book> newBooks = findUnsavedBooks(externalBooks);

        try {
            return bookRepository.saveAll(newBooks);
        } catch (Exception e) {
            return bookRepository.findAllByTitle(title);
        }
    }

    private List<Book> findUnsavedBooks(List<Book> apiBooks) {
        List<Book> newBooks = new ArrayList<>();
        for (Book apiBook : apiBooks) {
            if (isNewBook(apiBook.getSourceId())) {
                newBooks.add(apiBook);
            }
        }

        return newBooks;
    }

    private boolean isNewBook(int sourceId) {
        Optional<Book> stored = bookRepository.findBySourceId(sourceId);

        return stored.isEmpty();
    }
}
