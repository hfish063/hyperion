package com.backend.demo.external.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Contribution {
    private int id;
    private String contribution;
    private Author author;

    public int getId() {
        return id;
    }

    public String getContribution() {
        return contribution;
    }

    public Author getAuthor() {
        return author;
    }
}
