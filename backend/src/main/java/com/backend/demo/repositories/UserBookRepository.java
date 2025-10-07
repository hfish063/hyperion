package com.backend.demo.repositories;

import com.backend.demo.entities.Edition;
import com.backend.demo.entities.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {
    boolean existsByEdition(Edition editionId);
}
