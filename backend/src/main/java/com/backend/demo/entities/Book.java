package com.backend.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "source_id", unique = true)
    private Integer sourceId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "first_publish_year")
    private String firstPublishYear;

    @Column(name = "cover_edition_id")
    private String coverEditionId;

    @Column(name = "cover_edition_image_url")
    private String coverEditionImageUrl;
}
