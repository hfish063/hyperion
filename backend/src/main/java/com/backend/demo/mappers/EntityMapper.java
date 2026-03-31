package com.backend.demo.mappers;

import java.util.List;

public interface EntityMapper<T, DTO> {
    T mapToEntity(DTO dto);

    List<T> mapToEntities(List<DTO> dtos);
}
