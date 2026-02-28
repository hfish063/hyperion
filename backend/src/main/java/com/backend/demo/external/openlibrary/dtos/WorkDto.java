package com.backend.demo.external.openlibrary.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WorkDto {
    private String id;
    private String title;
    private String description;
    @JsonProperty("first_publish_year")
    private String firstPublishYear;
    @JsonProperty("cover_edition_key")
    private String coverEditionKey;
}
