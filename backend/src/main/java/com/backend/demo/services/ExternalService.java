package com.backend.demo.services;

import com.backend.demo.entities.Edition;
import com.backend.demo.external.hardcover.HardcoverClient;
import com.backend.demo.external.hardcover.dtos.EditionDto;
import com.backend.demo.mappers.EditionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExternalService {
    private final HardcoverClient hardcoverClient;
    private final EditionMapper editionMapper;

    @Autowired
    public ExternalService(HardcoverClient hardcoverClient, EditionMapper editionMapper) {
        this.hardcoverClient = hardcoverClient;
        this.editionMapper = editionMapper;
    }

    /**
     * Search external data sources by ISBN (10 or 13) and retrieve edition information.
     *
     * @param isbn     ISBN to search by, formatted numerically (1234567890123, 1234567890).
     * @param apiToken Bearer token provided by the frontend client
     * @return Edition class with data from external search results mapped to the object's fields,
     *         or null if no match is found.
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
