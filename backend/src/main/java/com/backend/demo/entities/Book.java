package com.backend.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "hardcover_id", unique = true)
    private int hardcoverId;

    @Column(name = "title")
    private String title;

    @Column(name = "subtitle")
    private String subtitle;

    @Column(name = "description", length = 2500)
    private String description;

    @Column(name = "pages")
    private int pages;

    @Column(name = "releaes_year")
    private int releaseYear;

    @Column(name = "cover_image_url")
    private String coverImageUrl;
}
