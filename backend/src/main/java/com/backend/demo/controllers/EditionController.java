package com.backend.demo.controllers;

import com.backend.demo.entities.Edition;
import com.backend.demo.services.EditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/editions")
@CrossOrigin(origins = "http://localhost:3000")
public class EditionController {
    private final EditionService editionService;

    @Autowired
    public EditionController(EditionService editionService) {
        this.editionService = editionService;
    }

    @GetMapping("/search/id/{id}")
    public ResponseEntity<Edition> getEditionById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(editionService.findEditionById(id));
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
