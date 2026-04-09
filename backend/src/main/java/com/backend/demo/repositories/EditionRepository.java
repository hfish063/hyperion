package com.backend.demo.repositories;

import com.backend.demo.entities.Edition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EditionRepository extends JpaRepository<Edition, Long> {
    Optional<Edition> findByIsbn10(String isbn10);

    Optional<Edition> findByIsbn13(String isbn13);

    void deleteAllByIdIn(List<Long> ids);
}
