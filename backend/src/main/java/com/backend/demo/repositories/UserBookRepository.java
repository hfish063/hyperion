package com.backend.demo.repositories;

import com.backend.demo.constants.ReadingStatus;
import com.backend.demo.entities.Edition;
import com.backend.demo.entities.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {
    boolean existsByEdition(Edition editionId);

    List<UserBook> findAllByReadingStatus(ReadingStatus status);

    void deleteAllByEditionIdIn(List<Long> editionIds);
}
