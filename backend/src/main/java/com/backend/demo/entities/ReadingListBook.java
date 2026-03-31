package com.backend.demo.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "reading_list_books")
public class ReadingListBook {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reading_list_id")
    private ReadingList readingList;

    @ManyToOne
    @JoinColumn(name = "edition_id")
    private Edition edition;

    @Column(name = "ordinal")
    private Integer ordinal;

    @Column(name = "added_at")
    private LocalDateTime addedAt;

    public ReadingListBook() {
    }

    public ReadingListBook(ReadingList readingList, Edition edition, Integer ordinal) {
        this.readingList = readingList;
        this.edition = edition;
        this.ordinal = ordinal;
    }

    @PrePersist
    protected void onCreate() {
        addedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public ReadingList getReadingList() {
        return readingList;
    }

    public Edition getEdition() {
        return edition;
    }

    public Integer getOrdinal() {
        return ordinal;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }
}
