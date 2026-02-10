package com.backend.demo.services;

import com.backend.demo.constants.ReadingStatus;
import com.backend.demo.entities.UserBook;
import com.backend.demo.exceptions.ResourceAlreadyExistsException;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.UserBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserBookService {
    private UserBookRepository userBookRepository;

    @Autowired
    public UserBookService(UserBookRepository userBookRepository) {
        this.userBookRepository = userBookRepository;
    }

    public List<UserBook> findAllUserBooks() {
        return userBookRepository.findAll();
    }

    public UserBook findUserBookById(Long id) {
        Optional<UserBook> result = userBookRepository.findById(id);

        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find this edition in user's library");
        }

        return result.get();
    }

    public UserBook saveUserBook(UserBook newUserBook) {
        if (userBookRepository.existsByEdition(newUserBook.getEdition())) {
            throw new ResourceAlreadyExistsException("Edition is already in library.");
        }

        return userBookRepository.save(newUserBook);
    }

    public UserBook updateUserBookStatus(Long id, ReadingStatus newStatus) {
        Optional<UserBook> response = userBookRepository.findById(id);

        if (response.isEmpty()) {
            throw new ResourceNotFoundException("Failed to locate UserBook with corresponding id.");
        }

        UserBook userBook = response.get();
        userBook.setReadingStatus(newStatus);

        return userBookRepository.save(userBook);
    }

    public void deleteUserBookById(Long id) {
        userBookRepository.deleteById(id);
    }
}
