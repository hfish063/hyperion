package com.backend.demo.services;

import com.backend.demo.entities.Edition;
import com.backend.demo.entities.ReadingList;
import com.backend.demo.entities.ReadingListBook;
import com.backend.demo.exceptions.ResourceAlreadyExistsException;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.EditionRepository;
import com.backend.demo.repositories.ReadingListBookRepository;
import com.backend.demo.repositories.ReadingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReadingListBookService {
    private final ReadingListBookRepository readingListBookRepository;
    private final ReadingListRepository readingListRepository;
    private final EditionRepository editionRepository;

    @Autowired
    public ReadingListBookService(ReadingListBookRepository readingListBookRepository,
                                  ReadingListRepository readingListRepository,
                                  EditionRepository editionRepository) {
        this.readingListBookRepository = readingListBookRepository;
        this.readingListRepository = readingListRepository;
        this.editionRepository = editionRepository;
    }

    public List<ReadingListBook> findAllByListId(Long listId) {
        Optional<ReadingList> result = readingListRepository.findById(listId);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + listId);
        }

        return readingListBookRepository.findAllByReadingList(result.get());
    }

    public List<ReadingListBook> findAllByEditionId(Long editionId) {
        Optional<Edition> result = editionRepository.findById(editionId);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find edition with id: " + editionId);
        }

        return readingListBookRepository.findAllByEdition(result.get());
    }

    public ReadingListBook saveReadingListBook(ReadingListBook newReadingListBook) {
        if (readingListBookRepository.existsByReadingListAndEdition(
                newReadingListBook.getReadingList(), newReadingListBook.getEdition())) {
            throw new ResourceAlreadyExistsException("Edition is already in this list.");
        }

        return readingListBookRepository.save(newReadingListBook);
    }

    public ReadingListBook addEditionToList(Long listId, Edition edition) {
        Optional<ReadingList> readingList = readingListRepository.findById(listId);
        if (readingList.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + listId);
        }

        ReadingListBook toSave = new ReadingListBook(readingList.get(), edition, nextOrdinal(readingList.get()));
        return readingListBookRepository.save(toSave);
    }

    private int nextOrdinal(ReadingList readingList) {
        return readingList.getReadingListBooks().size() + 1;
    }

    public void deleteReadingListBookById(Long id) {
        Optional<ReadingListBook> result = readingListBookRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list book entry with id: " + id);
        }

        readingListBookRepository.deleteById(id);
    }
}
