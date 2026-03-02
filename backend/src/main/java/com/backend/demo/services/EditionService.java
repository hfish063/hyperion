package com.backend.demo.services;

import com.backend.demo.entities.Author;
import com.backend.demo.entities.Edition;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.external.hardcover.HardcoverClient;
import com.backend.demo.external.hardcover.dtos.EditionDto;
import com.backend.demo.external.hardcover.dtos.HardcoverEditionsResponse;
import com.backend.demo.mappers.EntityMapper;
import com.backend.demo.repositories.AuthorRepository;
import com.backend.demo.repositories.EditionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EditionService {
    private final EditionRepository editionRepository;
    private final AuthorRepository authorRepository;
    private final EntityMapper<Edition, EditionDto> editionMapper;
    private final HardcoverClient hardcoverClient;

    @Autowired
    public EditionService(EditionRepository editionRepository, AuthorRepository authorRepository, EntityMapper<Edition, EditionDto> editionMapper, HardcoverClient hardcoverClient) {
        this.editionRepository = editionRepository;
        this.authorRepository = authorRepository;
        this.editionMapper = editionMapper;
        this.hardcoverClient = hardcoverClient;
    }

    public List<Edition> findAllEditionsByTitle(String title) throws IOException {
        List<Edition> localEditions = editionRepository.findAllByTitle(title);

        if (!localEditions.isEmpty()) {
            return localEditions;
        }

        HardcoverEditionsResponse apiResponse = hardcoverClient.getEditionsByTitle(title);
        List<Edition> apiEditions = editionMapper.mapToEntities(apiResponse.getData().getEditions());
        List<Edition> editionsToSave = findUnsavedEditions(apiEditions);

        // persist authors first to prevent transient entity errors
        editionsToSave.forEach(this::persistAuthorsForEdition);

        // try/catch block prevents concurrency issues from multiple threads checking the database simultaneously
        try {
            return editionRepository.saveAll(editionsToSave);
        } catch (DataIntegrityViolationException e) {
            return editionRepository.findAllByTitle(title);
        }
    }

    private List<Edition> findUnsavedEditions(List<Edition> apiEditions) {
        List<Edition> editionsToSave = new ArrayList<>();
        for (Edition apiEdition : apiEditions) {
            String currentSourceId = apiEdition.getSourceId();

            if (isNewEdition(currentSourceId)) {
                editionsToSave.add(apiEdition);
            }
        }

        return editionsToSave;
    }

    public Edition findEditionBySourceId(String sourceId) {
        Optional<Edition> result = editionRepository.findBySourceId(sourceId);

        if (result.isPresent()) {
            return result.get();
        }

        // query Hardcover API if result is not held in database
        HardcoverEditionsResponse clientResult = hardcoverClient.getEditionById(sourceId);
        List<Edition> apiEditions = editionMapper.mapToEntities(clientResult.getData().getEditions());

        if (apiEditions.isEmpty()) {
            throw new RuntimeException("Hardcover API: Failed to locate edition with corresponding id.");
        }

        Edition apiEdition = apiEditions.get(0);

        // persist authors first to prevent transient entity errors
        persistAuthorsForEdition(apiEdition);

        boolean isNewEdition = isNewEdition(apiEdition.getSourceId());

        if (isNewEdition) {
            try {
                return editionRepository.save(apiEdition);
            } catch (DataIntegrityViolationException e) {
                Optional<Edition> storedEdition = editionRepository.findBySourceId(sourceId);
                return storedEdition.orElseThrow(() ->
                        new IllegalStateException("Edition should exist but was not found after save conflict."));
            }
        }

        return apiEdition;
    }

    public Edition findEditionByIsbn(String isbn) {
        Optional<Edition> storedEdition = Optional.empty();
        if (isbn.length() == 10) {
            storedEdition = editionRepository.findByIsbn10(isbn);
        } else if (isbn.length() == 13) {
            storedEdition = editionRepository.findByIsbn13(isbn);
        }

        if (storedEdition.isEmpty()) {
            throw new ResourceNotFoundException("Failed to locate an edition with ISBN: " + isbn);
        }

        return storedEdition.get();
    }

    /**
     * Checks database for the apiEdition, returns false if it's not in the database already.
     *
     * @param sourceId The sourceId of the edition (fetched from third party API) that we are checking db against.
     * @return True in the case of a new edition (not already stored in database), false if it's already in the db.
     */
    public boolean isNewEdition(String sourceId) {
        Optional<Edition> stored = editionRepository.findBySourceId(sourceId);

        return stored.isEmpty();
    }

    /**
     * Persists Author to the database, ensuring that hibernate manages the entity.  Trying to persist without calling
     * this function will result in a transient entity error.
     *
     * @param edition The edition that is about to be saved.
     */
    private void persistAuthorsForEdition(Edition edition) {
        edition.getCollaborators().forEach(collaborator -> {
            Author author = collaborator.getAuthor();

            if (author != null) {
                Author storedAuthor = authorRepository.findFirstBySourceId(author.getSourceId());

                if (storedAuthor == null) {
                    storedAuthor = authorRepository.save(author);
                }

                collaborator.setAuthor(storedAuthor);
            }
        });
    }
}