package com.backend.demo.mappers;

import com.backend.demo.entities.Author;
import com.backend.demo.entities.Collaborator;
import com.backend.demo.entities.Edition;
import com.backend.demo.external.dtos.AuthorDto;
import com.backend.demo.external.dtos.ContributionDto;
import com.backend.demo.external.dtos.EditionDto;
import com.backend.demo.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EditionMapper implements EntityMapper<Edition, EditionDto> {
    private AuthorRepository authorRepository;

    @Autowired
    public EditionMapper(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public Edition mapToEntity(EditionDto dto) {
        if (dto == null) {
            return null;
        }

        Edition result = new Edition();

        result.setHardcoverId(dto.getId());
        result.setTitle(dto.getTitle());
        result.setSubtitle(dto.getSubtitle());

        if (dto.getBook() != null) {
            result.setDescription(dto.getBook().getDescription());
        }

        if (dto.getImage() != null) {
            result.setCoverImageUrl(dto.getImage().getUrl());
        }

        result.setReleaseYear(dto.getReleaseYear());
        result.setIsbn10(dto.getIsbn10());
        result.setIsbn13(dto.getIsbn13());
        result.setPages(dto.getPages());
        result.setEditionFormat(dto.getEditionFormat());

        result.addCollaborators(getCollaboratorsFromDto(dto));

        return result;
    }

    /**
     * Save authors in EditionDto to db.  This step is required because it is not possible to access the state of an
     * entity that has not been transacted to the database.
     * This approach is flawed and will result in far more queries than desired, TODO: improve algorithm
     *
     * @param dto edition dto containing contribution data that authors will be extracted from
     * @return list of collaborators containing authors and other relevant details
     */
    private List<Collaborator> getCollaboratorsFromDto(EditionDto dto) {
        List<Collaborator> collaborators = new ArrayList<>();

        for (ContributionDto contribution : dto.getContributions()) {
            AuthorDto authorDto = contribution.getAuthor();

            // check if author already exists in db
            Author author = authorRepository.findFirstBySourceId(authorDto.getId());

            if (author == null) {
                author = new Author();
                author.setName(authorDto.getName());
                author.setSourceId(authorDto.getId());
                author = authorRepository.save(author);
            }

            Collaborator collaborator = new Collaborator();
            collaborator.setSourceId(contribution.getId());
            collaborator.setAuthor(author);
            collaborator.setContribution(contribution.getContribution());

            collaborators.add(collaborator);
        }

        return collaborators;
    }

    public List<Edition> mapToEntities(List<EditionDto> dtos) {
        if (dtos == null) {
            return null;
        }

        List<Edition> results = new ArrayList<>();

        for (EditionDto dto : dtos) {
            results.add(mapToEntity(dto));
        }

        return results;
    }
}
