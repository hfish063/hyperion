package com.backend.demo.repositories;

import com.backend.demo.entities.UserBook;
import com.backend.demo.entities.UserList;
import com.backend.demo.entities.UserListBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserListBookRepository extends JpaRepository<UserListBook, Long> {
    List<UserListBook> findAllByUserList(UserList userList);
    List<UserListBook> findAllByUserBook(UserBook userBook);
    boolean existsByUserListAndUserBook(UserList userList, UserBook userBook);
}
