package com.backend.demo.external.hardcover.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BookDto {
    private int id;
    private String title;
    private String description;
    private Integer pages;
    @JsonProperty("release_year")
    private Integer releaseYear;
    @JsonProperty("default_cover_edition")
    private CoverEditionDto defaultCoverEdition;

    public static class CoverEditionDto {
        private int id;
        private CoverImageDto image;

        public int getId() {
            return id;
        }

        public CoverImageDto getImage() {
            return image;
        }
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Integer getPages() {
        return pages;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public CoverEditionDto getDefaultCoverEdition() {
        return defaultCoverEdition;
    }
}
