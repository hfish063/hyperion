package com.backend.demo.mappers;

import com.backend.demo.entities.Author;
import com.backend.demo.entities.Collaborator;
import com.backend.demo.entities.Edition;
import com.backend.demo.external.hardcover.dtos.AuthorDto;
import com.backend.demo.external.hardcover.dtos.ContributionDto;
import com.backend.demo.external.hardcover.dtos.EditionDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class EditionMapper implements EntityMapper<Edition, EditionDto> {
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

    public Edition mapToEntity(EditionDto dto) {
        if (dto == null) {
            return null;
        }

        Edition result = new Edition();

        result.setSourceId(dto.getId());
        result.setTitle(dto.getTitle());

        if (dto.getBook() != null) {
            result.setDescription(dto.getBook().getDescription());
        }

        if (dto.getImage() != null) {
            result.setCoverImageUrl(dto.getImage().getUrl());
        }

        result.setIsbn10(dto.getIsbn10());
        result.setIsbn13(dto.getIsbn13());
        result.setPages(dto.getPages());
        result.setEditionFormat(dto.getEditionFormat());

        result.addCollaborators(mapCollaboratorsDtoToEntity(Arrays.asList(dto.getContributions())));

        return result;
    }

    private List<Collaborator> mapCollaboratorsDtoToEntity(List<ContributionDto> contributionsDto) {
        List<Collaborator> collaborators = new ArrayList<>();

        for (ContributionDto dto : contributionsDto) {
            Author author = mapAuthorDtoToEntity(dto.getAuthor());

            Collaborator toAdd = new Collaborator();
            toAdd.setAuthor(author);
            toAdd.setSourceId(dto.getId());
            toAdd.setContribution(dto.getContribution());

            collaborators.add(toAdd);
        }

        return collaborators;
    }

    private Author mapAuthorDtoToEntity(AuthorDto authorDto) {
        Author authorEntity = new Author();
        authorEntity.setName(authorDto.getName());
        authorEntity.setSourceId(authorDto.getId());

        return authorEntity;
    }
}