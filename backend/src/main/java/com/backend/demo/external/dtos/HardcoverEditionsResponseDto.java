package com.backend.demo.external.dtos;

import java.util.List;

public class HardcoverEditionsResponseDto {
    private HardcoverEditionsData data;

    public HardcoverEditionsData getData() {
        return data;
    }

    public static class HardcoverEditionsData {
        private List<EditionDto> editions;

        public List<EditionDto> getEditions() {
            return editions;
        }
    }
}
