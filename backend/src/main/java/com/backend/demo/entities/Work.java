package com.backend.demo.entities;

import jakarta.persistence.*;

/**
 * 'Work' refers to the parent of all editions.  This is the over-arching source material that all editions are
 * instances of.  For example, there might be multiple editions of 'The Illiad' published in the last 10 years, but all
 * are based off of the same work.
 */
@Entity
@Table(name = "works")
public class Work {
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
