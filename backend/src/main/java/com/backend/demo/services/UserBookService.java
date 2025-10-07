package com.backend.demo.services;

import com.backend.demo.entities.UserBook;
import com.backend.demo.repositories.UserBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public UserBook saveUserBook(UserBook newUserBook) {
        if (userBookRepository.existsByEdition(newUserBook.getEdition())) {
            throw new RuntimeException("Edition is already in library.");
        }

        return userBookRepository.save(newUserBook);
    }

    public void deleteUserBookById(Long id) {
        userBookRepository.deleteById(id);
    }
}
