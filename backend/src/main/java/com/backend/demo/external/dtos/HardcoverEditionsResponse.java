package com.backend.demo.external.dtos;

import java.util.List;

public class HardcoverEditionsResponse {
    private HardcoverEditionsData data;

    public HardcoverEditionsData getData() {
        return data;
    }

    public static class HardcoverEditionsData {
        private List<Edition> editions;

        public List<Edition> getEditions() {
            return editions;
        }
    }
}
