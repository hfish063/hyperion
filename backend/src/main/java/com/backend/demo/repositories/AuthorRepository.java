package com.backend.demo.repositories;

import com.backend.demo.entities.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Author findFirstBySourceId(int sourceId);
}
