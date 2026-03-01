package com.backend.demo.repositories;

import com.backend.demo.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAllByTitle(String title);

    Optional<Book> findBySourceId(int sourceId);
}
