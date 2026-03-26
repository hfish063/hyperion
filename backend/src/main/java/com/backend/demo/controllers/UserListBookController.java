package com.backend.demo.controllers;

import com.backend.demo.entities.UserListBook;
import com.backend.demo.services.UserListBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/list-books")
@CrossOrigin(origins = "http://localhost:3000")
public class UserListBookController {
    private final UserListBookService userListBookService;

    @Autowired
    public UserListBookController(UserListBookService userListBookService) {
        this.userListBookService = userListBookService;
    }

    @GetMapping("/list/{listId}")
    public List<UserListBook> getAllByListId(@PathVariable("listId") Long listId) {
        return userListBookService.findAllByListId(listId);
    }

    @GetMapping("/book/{userBookId}")
    public List<UserListBook> getAllByUserBookId(@PathVariable("userBookId") Long userBookId) {
        return userListBookService.findAllByUserBookId(userBookId);
    }

    @PostMapping("/save")
    public UserListBook saveUserListBook(@RequestBody UserListBook newUserListBook) {
        return userListBookService.saveUserListBook(newUserListBook);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserListBookById(@PathVariable("id") Long id) {
        userListBookService.deleteUserListBookById(id);
    }
}
