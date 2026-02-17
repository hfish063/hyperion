package com.backend.demo.external.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AuthorDto {
    private int id;
    private String name;

    private int sourceId;

    public int getSourceId() {
        return sourceId;
    }

    public String getName() {
        return name;
    }
}
