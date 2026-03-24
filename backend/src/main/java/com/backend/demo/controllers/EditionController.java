package com.backend.demo.controllers;

import com.backend.demo.entities.Edition;
import com.backend.demo.services.EditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/editions")
@CrossOrigin(origins = "http://localhost:3000")
public class EditionController {
    private final EditionService editionService;

    @Autowired
    public EditionController(EditionService editionService) {
        this.editionService = editionService;
    }

    @GetMapping("/search/title/{title}")
    public ResponseEntity<List<Edition>> getEditionsByTitle(
            @PathVariable("title") String title,
            @RequestParam(required = false) Integer limit,
            @RequestParam(defaultValue = "0") int offset,
            @RequestHeader(value = "X-Hardcover-Token", required = false) String hardcoverToken) throws IOException {

        if (hardcoverToken == null || hardcoverToken.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<Edition> results = editionService.findAllEditionsByTitle(title, hardcoverToken);

        if (offset >= results.size()) {
            return ResponseEntity.ok(new ArrayList<>(Collections.emptyList()));
        }

        int end = limit == null ? results.size() : Math.min(offset + limit, results.size());

        return ResponseEntity.ok(results.subList(offset, end));
    }

    @GetMapping("/search/id/{id}")
    public ResponseEntity<Edition> getEditionById(
            @PathVariable("id") String id,
            @RequestHeader(value = "X-Hardcover-Token", required = false) String hardcoverToken) {

        if (hardcoverToken == null || hardcoverToken.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(editionService.findEditionBySourceId(id, hardcoverToken));
    }

    @GetMapping("/search/isbn/{isbn}")
    public ResponseEntity<Edition> getEditionByIsbn(
            @PathVariable("isbn") String isbn,
            @RequestHeader(value = "X-Hardcover-Token", required = false) String hardcoverToken) {

        if (hardcoverToken == null || hardcoverToken.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(editionService.findEditionByIsbn(isbn, hardcoverToken));
    }

    @PostMapping("/save")
    public Edition saveEdition(@RequestBody Edition edition) {
        return editionService.saveEdition(edition);
    }
}
