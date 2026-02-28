package com.backend.demo.external.openlibrary;

import com.backend.demo.external.openlibrary.dtos.OpenLibraryDoc;
import com.backend.demo.external.openlibrary.dtos.OpenLibraryResponse;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;
import java.util.List;

@Component
public class OpenLibraryClient {
    private static final String BASE_URL = "https://openlibrary.org";
    private final RestTemplate restTemplate = new RestTemplate();

    public List<OpenLibraryDoc> searchWorksByTitle(String title) {
        String url = UriComponentsBuilder.fromUriString(BASE_URL + "/search.json")
                .queryParam("title", title)
                .build()
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.add("User-Agent", "Hyperion: (hayden.fish@icloud.com");
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);

        ResponseEntity<OpenLibraryResponse> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, OpenLibraryResponse.class);
        OpenLibraryResponse response = responseEntity.getBody();

        if (response.getDocs() == null) {
            return Collections.emptyList();
        }

        return response.getDocs();
    }
}
