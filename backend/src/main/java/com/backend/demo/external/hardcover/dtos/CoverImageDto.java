package com.backend.demo.external.hardcover.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CoverImageDto {
    private String url;

    public String getUrl() {
        return url;
    }
}
