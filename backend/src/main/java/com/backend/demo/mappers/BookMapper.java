package com.backend.demo.mappers;

import com.backend.demo.entities.Book;
import com.backend.demo.external.hardcover.dtos.BookDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BookMapper implements EntityMapper<Book, BookDto> {
    @Override
    public List<Book> mapToEntities(List<BookDto> bookDtos) {
        List<Book> results = new ArrayList<>();

        for (BookDto dto : bookDtos) {
            // Skip garbage dto
            if (dto.getDefaultCoverEdition() == null) {
                continue;
            }

            results.add(mapToEntity(dto));
        }

        return results;
    }

    @Override
    public Book mapToEntity(BookDto bookDto) {
        if (bookDto == null) {
            return null;
        }

        Book book = new Book();
        book.setSourceId(bookDto.getId());
        book.setTitle(bookDto.getTitle());

        if (bookDto.getReleaseYear() != null) {
            book.setFirstPublishYear(String.valueOf(bookDto.getReleaseYear()));
        }

        if (bookDto.getDefaultCoverEdition() != null) {
            book.setCoverEditionId(String.valueOf(bookDto.getDefaultCoverEdition().getId()));

            if (bookDto.getDefaultCoverEdition().getImage() != null) {
                book.setCoverEditionImageUrl(bookDto.getDefaultCoverEdition().getImage().getUrl());
            }
        }

        return book;
    }
}
