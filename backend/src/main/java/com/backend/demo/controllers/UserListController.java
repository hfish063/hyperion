package com.backend.demo.controllers;

import com.backend.demo.entities.UserList;
import com.backend.demo.services.UserListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lists")
@CrossOrigin(origins = "http://localhost:3000")
public class UserListController {
    private final UserListService userListService;

    @Autowired
    public UserListController(UserListService userListService) {
        this.userListService = userListService;
    }

    @GetMapping("/all")
    public List<UserList> getAllUserLists() {
        return userListService.findAllUserLists();
    }

    @GetMapping("/{id}")
    public UserList getUserListById(@PathVariable("id") Long id) {
        return userListService.findUserListById(id);
    }

    @PostMapping("/save")
    public UserList saveUserList(@RequestBody UserList newUserList) {
        return userListService.saveUserList(newUserList);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserListById(@PathVariable("id") Long id) {
        userListService.deleteUserListById(id);
    }
}
