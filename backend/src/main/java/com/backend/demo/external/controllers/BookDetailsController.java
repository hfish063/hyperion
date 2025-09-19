package com.backend.demo.external.controllers;

import com.backend.demo.entities.Edition;
import com.backend.demo.external.HardcoverClient;
import com.backend.demo.external.dtos.EditionDto;
import com.backend.demo.external.dtos.HardcoverEditionsResponseDto;
import com.backend.demo.mappers.EntityMapper;
import com.backend.demo.services.EditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/meta/")
@CrossOrigin(origins = "http://localhost:3000")
public class BookDetailsController {
    private final HardcoverClient hardcoverClient;
    private final EditionService editionService;
    private final EntityMapper<Edition, EditionDto> editionMapper;

    @Autowired
    public BookDetailsController(HardcoverClient hardcoverClient, EditionService editionService, EntityMapper<Edition, EditionDto> editionMapper) {
        this.hardcoverClient = hardcoverClient;
        this.editionService = editionService;
        this.editionMapper = editionMapper;
    }

    @GetMapping("search/title/{title}")
    public List<Edition> getEditionsByTitle(@PathVariable("title") String title,
                                            @RequestParam(required = false) Integer limit,
                                            @RequestParam(defaultValue = "0") int offset) throws IOException {
        // check db for editions by title
        List<Edition> storedData = editionService.findAllEditionsByTitle(title);
        List<Edition> results;

        // rely on external api only if editions do not exist in db
        if (!storedData.isEmpty()) {
            System.out.println("Database hit: Returning " + storedData.size() + " results for '" + title + "'.");
            results = storedData;
        } else {
            HardcoverEditionsResponseDto response = hardcoverClient.getEditionsByTitle(title);
            List<EditionDto> editions = response.getData().getEditions();
            results = editionMapper.mapToEntities(editions);
        }

        // apply offset and limit rules to response
        if (offset >= results.size()) {
            return new ArrayList<>(Collections.emptyList());
        }

        int end = limit == null ? results.size() : Math.min(offset + limit, results.size());

        return results.subList(offset, end);
    }

    @GetMapping("search/id/{id}")
    public List<Edition> getEditionById(@PathVariable("id") int id) {
        HardcoverEditionsResponseDto response = hardcoverClient.getEditionById(id);
        List<EditionDto> editions = response.getData().getEditions();

        return editionMapper.mapToEntities(editions);
    }
}
