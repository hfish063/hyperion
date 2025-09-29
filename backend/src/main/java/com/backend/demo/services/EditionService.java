package com.backend.demo.services;

import com.backend.demo.entities.Edition;
import com.backend.demo.external.HardcoverClient;
import com.backend.demo.external.dtos.EditionDto;
import com.backend.demo.external.dtos.HardcoverEditionsResponseDto;
import com.backend.demo.mappers.EntityMapper;
import com.backend.demo.repositories.CollaboratorRepository;
import com.backend.demo.repositories.EditionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        // check db for editions by title
        List<Edition> storedData = editionRepository.findAllByTitle(title);

        List<Edition> results;

        // rely on external api only if editions do not exist in db
        if (!storedData.isEmpty()) {
            System.out.println("Database hit: Returning " + storedData.size() + " results for '" + title + "'.");
            results = storedData;
        } else {
            HardcoverEditionsResponseDto response = hardcoverClient.getEditionsByTitle(title);

            // save new edition data to db
            saveIfNotExists(editionMapper.mapToEntities(response.getData().getEditions()));

            List<EditionDto> editions = response.getData().getEditions();
            results = editionMapper.mapToEntities(editions);
        }
        
        return results;
    }

    public Edition findEditionByIsbn13(String isbn13) {
        Optional<Edition> result = editionRepository.findByIsbn13(isbn13);

        if (result.isEmpty()) {
            throw new RuntimeException("Unable to retrieve book with matching isbn13");
        }

        return result.get();
    }

    public List<Edition> saveIfNotExists(List<Edition> editions) {
        try {
            List<Edition> newEditions = editions.stream()
                    .filter(edition -> !editionRepository.existsByIsbn13(edition.getIsbn13()))
                    .collect(Collectors.toList());

            return editionRepository.saveAll(newEditions);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        return new ArrayList<>();
    }
}
