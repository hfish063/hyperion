package com.backend.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "collaborators")
public class Collaborator {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "source_id")
    private int sourceId;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;

    @Column(name = "contribution")
    private String contribution;

    @JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "edition_id")
    private Edition editions;

    public Collaborator() {
    }

    public Collaborator(int sourceId, Author author, String contribution) {
        this.sourceId = sourceId;
        this.author = author;
        this.contribution = contribution;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getSourceId() {
        return sourceId;
    }

    public void setSourceId(int sourceId) {
        this.sourceId = sourceId;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public String getContribution() {
        return contribution;
    }

    public void setContribution(String contribution) {
        this.contribution = contribution;
    }

    public Edition getEditions() {
        return editions;
    }

    public void setEditions(Edition editions) {
        this.editions = editions;
    }
}
