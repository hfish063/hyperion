package com.backend.demo.services;

import com.backend.demo.entities.Book;
import com.backend.demo.external.hardcover.HardcoverClient;
import com.backend.demo.external.hardcover.dtos.HardcoverBooksResponse;
import com.backend.demo.external.openlibrary.OpenLibraryClient;
import com.backend.demo.external.openlibrary.dtos.OpenLibraryResponse;
import com.backend.demo.mappers.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookAggregationService {
    private final HardcoverClient hardcoverClient;
    private final OpenLibraryClient openLibraryClient;
    private final BookMapper bookMapper;

    @Autowired
    public BookAggregationService(HardcoverClient hardcoverClient, OpenLibraryClient openLibraryClient, BookMapper bookMapper) {
        this.hardcoverClient = hardcoverClient;
        this.openLibraryClient = openLibraryClient;
        this.bookMapper = bookMapper;
    }

    public List<Book> doExternalBookSearch(String title) {
        HardcoverBooksResponse hardcoverResponse = hardcoverClient.getBooksByTitle(title);
        OpenLibraryResponse openLibraryResponse = openLibraryClient.searchWorksByTitle(title);

        return mergeSearchResults(hardcoverResponse, openLibraryResponse);
    }

    private List<Book> mergeSearchResults(HardcoverBooksResponse hardcoverResponse,
                                          OpenLibraryResponse openLibraryResponse) {
        return null;
    }
}
