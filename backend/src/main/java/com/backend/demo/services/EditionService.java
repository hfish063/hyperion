package com.backend.demo.services;

import com.backend.demo.entities.Edition;
import com.backend.demo.external.HardcoverClient;
import com.backend.demo.external.dtos.EditionDto;
import com.backend.demo.external.dtos.HardcoverEditionsResponseDto;
import com.backend.demo.mappers.EntityMapper;
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
    private final EntityMapper<Edition, EditionDto> editionMapper;
    private final HardcoverClient hardcoverClient;

    @Autowired
    public EditionService(EditionRepository editionRepository, EntityMapper<Edition, EditionDto> editionMapper, HardcoverClient hardcoverClient) {
        this.editionRepository = editionRepository;
        this.editionMapper = editionMapper;
        this.hardcoverClient = hardcoverClient;
    }

    public List<Edition> findAllEditionsByTitle(String title) throws IOException {
        List<Edition> localEditions = editionRepository.findAllByTitle(title);

        if (!localEditions.isEmpty()) {
            return localEditions;
        }

        HardcoverEditionsResponseDto apiResponse = hardcoverClient.getEditionsByTitle(title);
        List<Edition> apiEditions = editionMapper.mapToEntities(apiResponse.getData().getEditions());
        List<Edition> editionsToSave = filterExistingEditions(apiEditions);

        // try/catch block prevents concurrency issues from multiple threads checking the database simultaneously
        try {
            return editionRepository.saveAll(editionsToSave);
        } catch (DataIntegrityViolationException e) {
            return localEditions;
        }
    }

    private List<Edition> filterExistingEditions(List<Edition> apiEditions) {
        List<Edition> editionsToSave = new ArrayList<>();
        for (Edition apiEdition : apiEditions) {
            int currentSourceId = apiEdition.getSourceId();

            if (isNewEdition(currentSourceId)) {
                editionsToSave.add(apiEdition);
            }
        }

        return editionsToSave;
    }

    public Edition findEditionBySourceId(int sourceId) {
        Optional<Edition> result = editionRepository.findBySourceId(sourceId);

        if (result.isPresent()) {
            return result.get();
        }

        // query Hardcover API if result is not held in database
        HardcoverEditionsResponseDto clientResult = hardcoverClient.getEditionById(sourceId);
        List<Edition> apiEditions = editionMapper.mapToEntities(clientResult.getData().getEditions());

        if (apiEditions.isEmpty()) {
            throw new RuntimeException("Hardcover API: Failed to locate edition with corresponding id.");
        }

        Edition apiEdition = apiEditions.get(0);
        boolean isNewEdition = isNewEdition(apiEdition.getSourceId());

        if (isNewEdition) {
            return editionRepository.save(apiEdition);
        }

        return apiEdition;
    }

    /**
     * Checks database for the apiEdition, returns false if it's not in the database already.
     *
     * @param sourceId The sourceId of the edition (fetched from third party API) that we are checking db against.
     * @return True in the case of a new edition (not already stored in database), false if it's already in the db.
     */
    public boolean isNewEdition(int sourceId) {
        Optional<Edition> stored = editionRepository.findBySourceId(sourceId);

        return stored.isEmpty();
    }
}
