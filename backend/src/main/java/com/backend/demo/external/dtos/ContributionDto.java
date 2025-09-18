package com.backend.demo.external.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ContributionDto {
    private int id;
    private String contribution;
    private AuthorDto author;

    public int getId() {
        return id;
    }

    public String getContribution() {
        return contribution;
    }

    public AuthorDto getAuthor() {
        return author;
    }
}
