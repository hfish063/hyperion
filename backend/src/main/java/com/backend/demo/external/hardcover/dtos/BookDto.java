package com.backend.demo.external.hardcover.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Nested DTO representing the parent book object within an EditionDto response.
 * Used to extract description since description is stored on the book, not the edition.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookDto {
    private String description;

    public String getDescription() {
        return description;
    }
}
