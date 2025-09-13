package com.backend.demo.external.dtos.old;

import com.backend.demo.config.DescriptionDeserializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BookMetadata {
    @JsonProperty("key")
    private String workId;

    private String title;

    @JsonDeserialize(using = DescriptionDeserializer.class)
    private BookDescription description;

    @JsonProperty("first_publish_date")
    private String firstPublishDate;

    @JsonProperty("covers")
    private String[] coverIds;

    private OpenLibraryLink[] links;

    private String[] subjects;

    public String getWorkId() {
        return workId;
    }

    public String getTitle() {
        return title;
    }

    public BookDescription getDescription() {
        return description;
    }

    public String getFirstPublishDate() {
        return firstPublishDate;
    }

    public String[] getCoverIds() {
        return coverIds;
    }

    public OpenLibraryLink[] getLinks() {
        return links;
    }

    public String[] getSubjects() {
        return subjects;
    }
}
