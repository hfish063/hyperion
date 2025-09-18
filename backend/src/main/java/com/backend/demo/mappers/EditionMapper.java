package com.backend.demo.mappers;

import com.backend.demo.entities.Edition;
import com.backend.demo.external.dtos.EditionDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EditionMapper implements EntityMapper<Edition, EditionDto> {
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
        result.setEditionFormat(dto.getEditionFormat());

        return result;
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
