package com.backend.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "source_id", unique = true)
    private Integer sourceId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "first_publish_year")
    private String firstPublishYear;

    @Column(name = "cover_edition_id")
    private String coverEditionId;

    @Column(name = "cover_edition_image_url")
    private String coverEditionImageUrl;

    public Long getId() {
        return id;
    }

    public Integer getSourceId() {
        return sourceId;
    }

    public String getTitle() {
        return title;
    }

    public String getFirstPublishYear() {
        return firstPublishYear;
    }

    public String getCoverEditionId() {
        return coverEditionId;
    }

    public String getCoverEditionImageUrl() {
        return coverEditionImageUrl;
    }

    public void setSourceId(Integer sourceId) {
        this.sourceId = sourceId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setFirstPublishYear(String firstPublishYear) {
        this.firstPublishYear = firstPublishYear;
    }

    public void setCoverEditionId(String coverEditionId) {
        this.coverEditionId = coverEditionId;
    }

    public void setCoverEditionImageUrl(String coverEditionImageUrl) {
        this.coverEditionImageUrl = coverEditionImageUrl;
    }
}
