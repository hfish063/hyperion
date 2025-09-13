package com.backend.demo.external.dtos.old;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenLibraryDoc {
    private String title;

    @JsonProperty("author_name")
    private List<String> authorName;

    @JsonProperty("cover_i")
    private Integer coverI;

    @JsonProperty("key")
    public String workId;

    public String getTitle() {
        return title;
    }

    public List<String> getAuthorName() {
        return authorName;
    }

    public Integer getCoverI() {
        return coverI;
    }

    public String getWorkId() {
        return workId;
    }
}
