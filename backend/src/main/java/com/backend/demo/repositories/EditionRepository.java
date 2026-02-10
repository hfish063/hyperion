package com.backend.demo.repositories;

import com.backend.demo.entities.Edition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EditionRepository extends JpaRepository<Edition, Long> {
    List<Edition> findAllByTitle(String title);

    Optional<Edition> findByHardcoverId(int sourceId);

    boolean existsByIsbn13(String isbn13);
}
