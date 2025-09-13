package com.backend.demo.external.dtos.old;

import java.util.List;

public class BookCoverMetadata {
    private String title;
    private List<String> authors;
    private String coverImageUrl;
    private String workId;

    public BookCoverMetadata() {
    }

    public BookCoverMetadata(String title, List<String> authors, String coverImageUrl, String workId) {
        this.title = title;
        this.authors = authors;
        this.coverImageUrl = coverImageUrl;
        this.workId = workId;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getAuthors() {
        return authors;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public String getWorkId() {
        return workId;
    }
}
