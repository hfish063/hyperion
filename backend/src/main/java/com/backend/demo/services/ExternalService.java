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
    private final OpenLibraryClient openLibraryClient;
    private final BookMapper bookMapper;
    private final EditionMapper editionMapper;

    @Autowired
    public ExternalService(HardcoverClient hardcoverClient, OpenLibraryClient openLibraryClient, BookMapper bookMapper, EditionMapper editionMapper) {
        this.hardcoverClient = hardcoverClient;
        this.openLibraryClient = openLibraryClient;
        this.bookMapper = bookMapper;
        this.editionMapper = editionMapper;
    }

    public List<Book> doExternalBookSearch(String title, String apiToken) {
        HardcoverBooksResponse hardcoverResponse = hardcoverClient.getBooksByTitle(title, apiToken);
        List<BookDto> dtos = hardcoverResponse.getData().getBooks();
        List<Book> apiBooks = bookMapper.mapToEntities(dtos);

        if (apiBooks.isEmpty()) {
            return searchFallbackSource(title);
        }

        return apiBooks;
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

    /**
     * Pull data from OpenLibraryAPI if HardcoverAPI fails to find valid search results.
     *
     * @param title Query parameter for external API
     * @return List of search results from secondary data source.
     */
    private List<Book> searchFallbackSource(String title) {
        OpenLibraryResponse openLibraryResponse = openLibraryClient.searchWorksByTitle(title);

        List<BookDto> convertedResponse = convertFallbackSourceResponse(openLibraryResponse);
        return bookMapper.mapToEntities(convertedResponse);
    }

    private List<BookDto> convertFallbackSourceResponse(OpenLibraryResponse openLibraryResponse) {
        List<BookDto> dtos = new ArrayList<>();

        List<OpenLibraryDoc> docs = openLibraryResponse.getDocs();

        if (docs == null || docs.isEmpty()) {
            return dtos;
        }

        for (OpenLibraryDoc doc : docs) {
            BookDto dto = new BookDto();
            dto.setTitle(doc.getTitle());
            dto.setReleaseYear(doc.getFirstPublishYear());

            // create dto objects for storing cover edition data

            dtos.add(dto);
        }

        return dtos;
    }

    private boolean needsEnrichment(Book book) {
        return book.getCoverEditionImageUrl() == null;
    }

    /**
     * Attempt to fill missing details for books using a secondary data source.
     *
     * @return List of books that are merged with any extra data found from external API.
     */
    private List<Book> enrichBooks() {
        return null;
    }
}
