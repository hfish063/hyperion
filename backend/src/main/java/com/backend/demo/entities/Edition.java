package com.backend.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "editions")
public class Edition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "hardcover_id", unique = true)
    private int hardcoverId;

    @Column(name = "title")
    private String title;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "author")
    private String author;

    @Column(name = "isbn10")
    private String isbn10;

    @Column(name = "isbn13", unique = true)
    private String isbn13;

    @Column(name = "release_year")
    private int releaseYear;

    @Column(name = "edition_format")
    private String editionFormat;

    @Column(name = "description", length = 2500)
    private String description;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "cover_image_url")
    private String coverImageUrl;

    public Long getId() {
        return id;
    }

    public int getHardcoverId() {
        return hardcoverId;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getAuthor() {
        return author;
    }

    public String getIsbn10() {
        return isbn10;
    }

    public String getIsbn13() {
        return isbn13;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public String getEditionFormat() {
        return editionFormat;
    }

    public String getPublisher() {
        return publisher;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setHardcoverId(int hardcoverId) {
        this.hardcoverId = hardcoverId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle;
    }

    public void setIsbn10(String isbn10) {
        this.isbn10 = isbn10;
    }

    public void setIsbn13(String isbn13) {
        this.isbn13 = isbn13;
    }

    public void setReleaseYear(int releaseYear) {
        this.releaseYear = releaseYear;
    }

    public void setEditionFormat(String editionFormat) {
        this.editionFormat = editionFormat;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
