package com.backend.demo.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_list_books")
public class UserListBook {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_list_id")
    private UserList userList;

    @ManyToOne
    @JoinColumn(name = "edition_id")
    private Edition edition;

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

    public UserList getUserList() {
        return userList;
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
