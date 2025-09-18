package com.backend.demo.external.dtos;

import java.util.List;

public class HardcoverBooksResponseDto {
    private HardcoverBooksData data;

    public HardcoverBooksData getData() {
        return data;
    }

    public static class HardcoverBooksData {
        private List<BookDto> books;

        public List<BookDto> getBooks() {
            return books;
        }
    }
}
