package com.backend.demo.repositories;

import com.backend.demo.entities.Edition;
import com.backend.demo.entities.ReadingList;
import com.backend.demo.entities.ReadingListBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadingListBookRepository extends JpaRepository<ReadingListBook, Long> {
    List<ReadingListBook> findAllByReadingList(ReadingList readingList);
    List<ReadingListBook> findAllByEdition(Edition edition);
    boolean existsByReadingListAndEdition(ReadingList readingList, Edition edition);
}
