package com.backend.demo.external.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Edition {
    private int id;
    private String title;
    private String subtitle;
    @JsonProperty("isbn_10")
    private String isbn10;
    @JsonProperty("isbn_13")
    private String isbn13;
    private String asin;
    private int pages;
    @JsonProperty("release_year")
    private int releaseYear;
    @JsonProperty("edition_format")
    private String editionFormat;
    @JsonProperty("image_id")
    private int imageId;
    private Book book;
    private Publisher publisher;
    private Contribution[] contributions;
    public CoverImage image;


    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getIsbn10() {
        return isbn10;
    }

    public String getIsbn13() {
        return isbn13;
    }

    public String getAsin() {
        return asin;
    }

    public int getPages() {
        return pages;
    }

    public int getReleaseYear() {
        return releaseYear;
    }

    public String getEditionFormat() {
        return editionFormat;
    }

    public int getImageId() {
        return imageId;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public Contribution[] getContributions() {
        return contributions;
    }

    public Book getBook() {
        return book;
    }

    public CoverImage getImage() {
        return image;
    }
}
