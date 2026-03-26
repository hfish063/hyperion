package com.backend.demo.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_list_books")
public class UserListBook {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_list_id")
    private Long userListId;

    @Column(name = "user_book_id")
    private Long userBookId;

    @Column(name = "ordinal")
    private Integer ordinal;

    @Column(name = "added_at")
    private LocalDateTime addedAt;

    @PrePersist
    protected void onCreate() {
        addedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Long getUserListId() {
        return userListId;
    }

    public Long getUserBookId() {
        return userBookId;
    }

    public Integer getOrdinal() {
        return ordinal;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }
}
