package com.backend.demo.services;

import com.backend.demo.entities.UserBook;
import com.backend.demo.entities.UserList;
import com.backend.demo.entities.UserListBook;
import com.backend.demo.exceptions.ResourceAlreadyExistsException;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.UserBookRepository;
import com.backend.demo.repositories.UserListBookRepository;
import com.backend.demo.repositories.UserListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserListBookService {
    private final UserListBookRepository userListBookRepository;
    private final UserListRepository userListRepository;
    private final UserBookRepository userBookRepository;

    @Autowired
    public UserListBookService(UserListBookRepository userListBookRepository,
                               UserListRepository userListRepository,
                               UserBookRepository userBookRepository) {
        this.userListBookRepository = userListBookRepository;
        this.userListRepository = userListRepository;
        this.userBookRepository = userBookRepository;
    }

    public List<UserListBook> findAllByListId(Long listId) {
        Optional<UserList> result = userListRepository.findById(listId);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + listId);
        }
        return userListBookRepository.findAllByUserList(result.get());
    }

    public List<UserListBook> findAllByUserBookId(Long userBookId) {
        Optional<UserBook> result = userBookRepository.findById(userBookId);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find user book with id: " + userBookId);
        }
        return userListBookRepository.findAllByUserBook(result.get());
    }

    public UserListBook saveUserListBook(UserListBook newUserListBook) {
        if (userListBookRepository.existsByUserListAndUserBook(
                newUserListBook.getUserList(), newUserListBook.getUserBook())) {
            throw new ResourceAlreadyExistsException("Book is already in this list.");
        }
        return userListBookRepository.save(newUserListBook);
    }

    public void deleteUserListBookById(Long id) {
        Optional<UserListBook> result = userListBookRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list book entry with id: " + id);
        }
        userListBookRepository.deleteById(id);
    }
}
