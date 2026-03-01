package com.backend.demo.services;

import com.backend.demo.entities.Book;
import com.backend.demo.external.hardcover.HardcoverClient;
import com.backend.demo.external.hardcover.dtos.BookDto;
import com.backend.demo.external.openlibrary.OpenLibraryClient;
import com.backend.demo.mappers.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    private final HardcoverClient hardcoverClient;
    private final OpenLibraryClient openLibraryClient;
    private final BookMapper bookMapper;

    @Autowired
    public BookService(HardcoverClient hardcoverClient, OpenLibraryClient openLibraryClient, BookMapper bookMapper) {
        this.hardcoverClient = hardcoverClient;
        this.openLibraryClient = openLibraryClient;
        this.bookMapper = bookMapper;
    }

    public List<Book> findAllBooksByTitle(String title) {
        List<BookDto> hardcoverResults = hardcoverClient.getBooksByTitle(title).getData().getBooks();

        return bookMapper.mapToEntities(hardcoverResults);
    }
}
