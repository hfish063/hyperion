package com.backend.demo.services;

import com.backend.demo.entities.Edition;
import com.backend.demo.entities.UserList;
import com.backend.demo.entities.UserListBook;
import com.backend.demo.exceptions.ResourceAlreadyExistsException;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.EditionRepository;
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
    private final EditionRepository editionRepository;

    @Autowired
    public UserListBookService(UserListBookRepository userListBookRepository,
                               UserListRepository userListRepository,
                               EditionRepository editionRepository) {
        this.userListBookRepository = userListBookRepository;
        this.userListRepository = userListRepository;
        this.editionRepository = editionRepository;
    }

    public List<UserListBook> findAllByListId(Long listId) {
        Optional<UserList> result = userListRepository.findById(listId);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + listId);
        }

        return userListBookRepository.findAllByUserList(result.get());
    }

    public List<UserListBook> findAllByEditionId(Long editionId) {
        Optional<Edition> result = editionRepository.findById(editionId);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find edition with id: " + editionId);
        }

        return userListBookRepository.findAllByEdition(result.get());
    }

    public UserListBook saveUserListBook(UserListBook newUserListBook) {
        if (userListBookRepository.existsByUserListAndEdition(
                newUserListBook.getUserList(), newUserListBook.getEdition())) {
            throw new ResourceAlreadyExistsException("Edition is already in this list.");
        }

        return userListBookRepository.save(newUserListBook);
    }

    public UserListBook addEditionToList(Long listId, Edition edition) {
        Optional<UserList> userList = userListRepository.findById(listId);
        if (userList.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + listId);
        }

        UserListBook toSave = buildUserListBook(userList.get(), edition, nextOrdinal(userList.get()));
        return userListBookRepository.save(toSave);
    }

    private int nextOrdinal(UserList userList) {
        return userList.getUserListBooks().size() + 1;
    }

    private UserListBook buildUserListBook(UserList userList, Edition edition, int ordinal) {
        return new UserListBook(userList, edition, ordinal);
    }

    public void deleteUserListBookById(Long id) {
        Optional<UserListBook> result = userListBookRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list book entry with id: " + id);
        }

        userListBookRepository.deleteById(id);
    }
}
