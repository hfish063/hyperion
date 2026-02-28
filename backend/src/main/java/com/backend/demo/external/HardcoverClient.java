package com.backend.demo.external;

import com.backend.demo.external.dtos.HardcoverEditionsResponseDto;
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

    public HardcoverEditionsResponseDto getEditionsByTitle(String title) throws IOException {
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
                        id
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

        return getHardcoverEditionsResponseDto(query);
    }

    public HardcoverEditionsResponseDto getEditionById(String id) {
        String query = """
                query GetSpecificEdition {
                  editions(where: {id: {_eq: "%s"}}) {
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
                }""".formatted(id);

        return getHardcoverEditionsResponseDto(query);
    }

    /**
     * Send request to Hardcover API at the 'hardCoverUrl' field.  This method saves results to database if they don't already exist,
     * to cache data and reduce future requests.  All setup for headers and response entity (RestTemplate) are handled here.
     *
     * @param query Graphql query String formatted for Hardcover API
     * @return DTO object containing Hardcover API response
     */
    private HardcoverEditionsResponseDto getHardcoverEditionsResponseDto(String query) {
        Map<String, String> body = buildQuery(query);

        HttpHeaders headers = getHttpHeaders();

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<HardcoverEditionsResponseDto> response = restTemplate.exchange(
                hardcoverUrl,
                HttpMethod.POST,
                entity,
                HardcoverEditionsResponseDto.class
        );

        return response.getBody();
    }

    private Map<String, String> buildQuery(String query) {
        Map<String, String> body = new HashMap<>();
        body.put("query", query);

        return body;
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", apiKey);
        return headers;
    }
}
