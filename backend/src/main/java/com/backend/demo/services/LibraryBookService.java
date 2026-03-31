package com.backend.demo.services;

import com.backend.demo.constants.ReadingStatus;
import com.backend.demo.entities.Edition;
import com.backend.demo.entities.LibraryBook;
import com.backend.demo.exceptions.ResourceAlreadyExistsException;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.EditionRepository;
import com.backend.demo.repositories.LibraryBookRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryBookService {
    private LibraryBookRepository libraryBookRepository;
    private EditionRepository editionRepository;

    @Autowired
    public LibraryBookService(LibraryBookRepository libraryBookRepository, EditionRepository editionRepository) {
        this.libraryBookRepository = libraryBookRepository;
        this.editionRepository = editionRepository;
    }

    public List<LibraryBook> findAllUserBooks() {
        return libraryBookRepository.findAll();
    }

    public List<LibraryBook> findAllUserBooksByReadingStatus(ReadingStatus status) {
        return libraryBookRepository.findAllByReadingStatus(status);
    }

    public LibraryBook findUserBookById(Long id) {
        Optional<LibraryBook> result = libraryBookRepository.findById(id);

        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find this edition in user's library");
        }

        return result.get();
    }

    public LibraryBook saveUserBook(LibraryBook newLibraryBook) {
        if (libraryBookRepository.existsByEdition(newLibraryBook.getEdition())) {
            throw new ResourceAlreadyExistsException("Edition is already in library.");
        }

        return libraryBookRepository.save(newLibraryBook);
    }

    /**
     * Save a UserBook that has been obtained from manual form input (not fetched from third party API).
     * In this case, we should first save the given edition, so that it is cached in our database for future searches.
     *
     * @param newLibraryBook The UserBook object containing manually inputted data.
     * @return Object that was saved to database if the transaction is successful.
     */
    public LibraryBook saveUserBookWithInput(LibraryBook newLibraryBook) {
        // first save the edition
        Edition editionSaveResult = editionRepository.save(newLibraryBook.getEdition());

        return libraryBookRepository.save(newLibraryBook);
    }

    public LibraryBook updateUserBookStatus(Long id, ReadingStatus newStatus) {
        Optional<LibraryBook> response = libraryBookRepository.findById(id);

        if (response.isEmpty()) {
            throw new ResourceNotFoundException("Failed to locate UserBook with corresponding id.");
        }

        LibraryBook libraryBook = response.get();
        libraryBook.setReadingStatus(newStatus);

        return libraryBookRepository.save(libraryBook);
    }

    public void deleteUserBookById(Long id) {
        libraryBookRepository.deleteById(id);
    }

    @Transactional
    public void deleteAllUserBooksByEditionIds(List<Long> editionIds) {
        libraryBookRepository.deleteAllByEditionIdIn(editionIds);
    }
}
