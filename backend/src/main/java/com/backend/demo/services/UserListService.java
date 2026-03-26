package com.backend.demo.services;

import com.backend.demo.entities.UserList;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.UserListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserListService {
    private final UserListRepository userListRepository;

    @Autowired
    public UserListService(UserListRepository userListRepository) {
        this.userListRepository = userListRepository;
    }

    public List<UserList> findAllUserLists() {
        return userListRepository.findAll();
    }

    public UserList findUserListById(Long id) {
        Optional<UserList> result = userListRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + id);
        }
        return result.get();
    }

    public UserList saveUserList(UserList newUserList) {
        return userListRepository.save(newUserList);
    }

    public void deleteUserListById(Long id) {
        Optional<UserList> result = userListRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + id);
        }
        userListRepository.deleteById(id);
    }
}
