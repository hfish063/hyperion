package com.backend.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reading_lists")
public class ReadingList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", length = 1020)
    private String description;

    @JsonProperty("isOrdered")
    @Column(name = "is_ordered", nullable = false)
    private boolean isOrdered;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @JsonIgnore
    @OneToMany(mappedBy = "readingList", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReadingListBook> readingListBooks;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isOrdered() {
        return isOrdered;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public List<ReadingListBook> getReadingListBooks() {
        return readingListBooks;
    }

    public void setOrdered(boolean ordered) {
        isOrdered = ordered;
    }
}
