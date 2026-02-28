package com.backend.demo.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 'Edition' refers to an instance of a specific work.  For example, there is only one work titled 'Lord of the Rings',
 * but countless editions have been published for it.
 */
@Entity
@Table(name = "editions")
public class Edition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "source_id", unique = true)
    private String sourceId;

    @Column(name = "title")
    private String title;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "isbn10")
    private String isbn10;

    @Column(name = "isbn13")
    private String isbn13;

    @Column(name = "pages")
    private int pages;

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

    @JsonManagedReference
    @OneToMany(mappedBy = "editions", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Collaborator> collaborators = new ArrayList<>();

    public void addCollaborators(List<Collaborator> newCollaborators) {
        for (Collaborator collaborator : newCollaborators) {
            addCollaborator(collaborator);
        }
    }

    public void addCollaborator(Collaborator newCollaborator) {
        collaborators.add(newCollaborator);
        newCollaborator.setEditions(this);
    }

    public Long getId() {
        return id;
    }

    public String getSourceId() {
        return sourceId;
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

    public int getPages() {
        return pages;
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

    public List<Collaborator> getCollaborators() {
        return collaborators;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSourceId(String sourceId) {
        this.sourceId = sourceId;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public void setPages(int pages) {
        this.pages = pages;
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

    public void setCollaborators(List<Collaborator> collaborators) {
        this.collaborators = collaborators;
    }
}
