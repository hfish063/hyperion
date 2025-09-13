package com.backend.demo.external;

import com.backend.demo.external.dtos.HardcoverEditionsResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class HardcoverClient {
    private RestTemplate restTemplate = new RestTemplate();
    private String hardcoverUrl = "https://api.hardcover.app/v1/graphql";
    @Value("${hardcover.api.key}")
    private String apiKey;

    public HardcoverEditionsResponse getEditionsByTitle(String title) throws IOException {
        String query = """
                query GetEditionsFromTitle {
                  editions(where: {title: {_eq: "%s"}}) {
                      id
                      title
                      subtitle
                      isbn_10
                      isbn_13
                      asin
                      pages
                      release_year
                      edition_format
                      image_id
                      book {
                          id
                          description
                      }
                      publisher {
                          id
                          name
                      }
                      contributions {
                        author {
                            id
                            name
                        }
                        contribution
                      }
                      image {
                        url
                      }
                  }
                }""".formatted(title);

        Map<String, String> body = new HashMap<>();
        body.put("query", query);

        HttpHeaders headers = getHttpHeaders();

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<HardcoverEditionsResponse> response = restTemplate.exchange(
                hardcoverUrl,
                HttpMethod.POST,
                entity,
                HardcoverEditionsResponse.class
        );

        return response.getBody();
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", apiKey);
        return headers;
    }
}
