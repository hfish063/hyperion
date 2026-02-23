package com.backend.demo.services;

import com.backend.demo.entities.Edition;
import com.backend.demo.external.HardcoverClient;
import com.backend.demo.external.dtos.EditionDto;
import com.backend.demo.external.dtos.HardcoverEditionsResponseDto;
import com.backend.demo.mappers.EntityMapper;
import com.backend.demo.repositories.CollaboratorRepository;
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
    private final CollaboratorRepository collaboratorRepository;
    private final EntityMapper<Edition, EditionDto> editionMapper;
    private final HardcoverClient hardcoverClient;

    @Autowired
    public EditionService(EditionRepository editionRepository, CollaboratorRepository collaboratorRepository, EntityMapper<Edition, EditionDto> editionMapper, HardcoverClient hardcoverClient) {
        this.editionRepository = editionRepository;
        this.collaboratorRepository = collaboratorRepository;
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

        return editionRepository.saveAll(editionsToSave);
    }
    
    private List<Edition> filterExistingEditions(List<Edition> apiEditions) {
        List<Edition> editionsToSave = new ArrayList<>();
        for (Edition apiEdition : apiEditions) {
            int currentSourceId = apiEdition.getSourceId();

            if (editionRepository.findBySourceId(currentSourceId).isEmpty()) {
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
        List<Edition> entityResult = editionMapper.mapToEntities(clientResult.getData().getEditions());

        if (entityResult.isEmpty()) {
            throw new RuntimeException("Hardcover API: Failed to locate edition with corresponding id.");
        }

        // save new data from Hardcover API
        saveIfNotExists(entityResult);

        return entityResult.get(0);
    }

    public void saveIfNotExists(List<Edition> editions) {
        for (Edition edition : editions) {
            try {
                editionRepository.save(edition);
            } catch (DataIntegrityViolationException e) {
                System.out.println("Edition already exists: " + edition.getSourceId());
            }
        }
    }
}
