package com.backend.demo.services;

import com.backend.demo.entities.Edition;
import com.backend.demo.repositories.EditionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EditionService {
    private final EditionRepository editionRepository;

    @Autowired
    public EditionService(EditionRepository editionRepository) {
        this.editionRepository = editionRepository;
    }

    public List<Edition> findAllEditionsByTitle(String title) {
        return editionRepository.findAllByTitle(title);
    }

    public Edition findEditionByIsbn13(String isbn13) {
        Optional<Edition> result = editionRepository.findByIsbn13(isbn13);

        if (result.isEmpty()) {
            throw new RuntimeException("Unable to retrieve book with matching isbn13");
        }

        return result.get();
    }

    public List<Edition> saveIfNotExists(List<Edition> books) {
        List<Edition> newBooks = books.stream()
                .filter(book -> !editionRepository.existsByIsbn13(book.getIsbn13()))
                .collect(Collectors.toList());

        return editionRepository.saveAll(newBooks);
    }
}
