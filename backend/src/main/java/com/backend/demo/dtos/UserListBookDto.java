package com.backend.demo.dtos;

import com.backend.demo.entities.Edition;
import org.springframework.stereotype.Component;

@Component
public class UserListBookDto {
    private Long listId;
    private Edition edition;

    public Long getListId() {
        return listId;
    }

    public void setListId(Long listId) {
        this.listId = listId;
    }

    public Edition getEdition() {
        return edition;
    }

    public void setEdition(Edition edition) {
        this.edition = edition;
    }
}
