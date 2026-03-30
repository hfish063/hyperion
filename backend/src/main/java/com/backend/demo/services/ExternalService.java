package com.backend.demo.services;

import com.backend.demo.entities.Book;
import com.backend.demo.entities.Edition;
import com.backend.demo.external.hardcover.HardcoverClient;
import com.backend.demo.external.hardcover.dtos.BookDto;
import com.backend.demo.external.hardcover.dtos.EditionDto;
import com.backend.demo.external.hardcover.dtos.HardcoverBooksResponse;
import com.backend.demo.external.openlibrary.OpenLibraryClient;
import com.backend.demo.external.openlibrary.dtos.OpenLibraryDoc;
import com.backend.demo.external.openlibrary.dtos.OpenLibraryResponse;
import com.backend.demo.mappers.BookMapper;
import com.backend.demo.mappers.EditionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExternalService {
    private final HardcoverClient hardcoverClient;
    private final BookMapper bookMapper;
    private final EditionMapper editionMapper;

    @Autowired
    public ExternalService(HardcoverClient hardcoverClient, BookMapper bookMapper, EditionMapper editionMapper) {
        this.hardcoverClient = hardcoverClient;
        this.bookMapper = bookMapper;
        this.editionMapper = editionMapper;
    }

    public List<Book> doExternalBookSearch(String title, String apiToken) {
        HardcoverBooksResponse hardcoverResponse = hardcoverClient.getBooksByTitle(title, apiToken);
        List<BookDto> dtos = hardcoverResponse.getData().getBooks();

        return bookMapper.mapToEntities(dtos);
    }

    /**
     * Search external data sources by ISBN (10 or 13) and retrieve edition information.
     *
     * @param isbn     ISBN to search by, formatted numerically (1234567890123, 1234567890).
     * @param apiToken Bearer token provided by the frontend client
     * @return Edition class with data from external search results mapped to the object's fields
     */
    public Edition doExternalIsbnSearch(String isbn, String apiToken) {
        if (isbn.length() == 10) {
            List<EditionDto> dtos = hardcoverClient.getEditionByIsbn10(isbn, apiToken).getData().getEditions();
            List<Edition> results = editionMapper.mapToEntities(dtos);

            if (!results.isEmpty()) {
                return results.get(0);
            }
        }

        if (isbn.length() == 13) {
            List<EditionDto> dtos = hardcoverClient.getEditionByIsbn13(isbn, apiToken).getData().getEditions();
            List<Edition> results = editionMapper.mapToEntities(dtos);

            if (!results.isEmpty()) {
                return results.get(0);
            }
        }

        return null;
    }
}
