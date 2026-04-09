package com.backend.demo.services;

import com.backend.demo.entities.Author;
import com.backend.demo.entities.Edition;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.AuthorRepository;
import com.backend.demo.repositories.EditionRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EditionService {
    private final EditionRepository editionRepository;
    private final AuthorRepository authorRepository;
    private final ExternalService externalService;

    @Autowired
    public EditionService(EditionRepository editionRepository, AuthorRepository authorRepository, ExternalService externalService) {
        this.editionRepository = editionRepository;
        this.authorRepository = authorRepository;
        this.externalService = externalService;
    }

    public Edition findEditionById(Long id) {
        return editionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Edition not found with id: " + id));
    }

    public Edition findEditionByIsbn(String isbn, String apiToken) {
        Optional<Edition> storedEdition = Optional.empty();
        if (isbn.length() == 10) {
            storedEdition = editionRepository.findByIsbn10(isbn);
        } else if (isbn.length() == 13) {
            storedEdition = editionRepository.findByIsbn13(isbn);
        }

        return storedEdition.orElseGet(() -> externalService.doExternalIsbnSearch(isbn, apiToken));
    }

    public Edition saveEdition(Edition newEdition) {
        return editionRepository.save(newEdition);
    }

    @Transactional
    public void deleteAllEditionsByIds(List<Long> ids) {
        editionRepository.deleteAllByIdIn(ids);
    }

    /**
     * Persists Author to the database, ensuring that Hibernate manages the entity. Trying to persist without calling
     * this function will result in a transient entity error.
     *
     * @param edition The edition that is about to be saved.
     */
    public void persistAuthorsForEdition(Edition edition) {
        edition.getCollaborators().forEach(collaborator -> {
            Author author = collaborator.getAuthor();

            if (author != null) {
                Author storedAuthor = authorRepository.findFirstBySourceId(author.getSourceId());

                if (storedAuthor == null) {
                    storedAuthor = authorRepository.save(author);
                }

                collaborator.setAuthor(storedAuthor);
            }
        });
    }
}
