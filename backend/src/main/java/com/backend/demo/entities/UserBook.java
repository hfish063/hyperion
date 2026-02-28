package com.backend.demo.entities;

import com.backend.demo.constants.ReadingStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_books")
public class UserBook {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "edition_id", nullable = false)
    private Edition edition;

    @Enumerated(EnumType.STRING)
    @Column(name = "reading_status")
    private ReadingStatus readingStatus; // WANT_TO_READ, CURRENTLY_READING, READ, DROPPED

    @Column(name = "user_id")
    private String userId;

    @Column(name = "date_added")
    private LocalDateTime dateAdded;

    @PrePersist
    protected void onCreate() {
        dateAdded = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Edition getEdition() {
        return edition;
    }

    public ReadingStatus getReadingStatus() {
        return readingStatus;
    }

    public String getUserId() {
        return userId;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setReadingStatus(ReadingStatus readingStatus) {
        this.readingStatus = readingStatus;
    }

}
