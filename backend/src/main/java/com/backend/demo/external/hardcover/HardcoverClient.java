package com.backend.demo.external.hardcover;

import com.backend.demo.external.hardcover.dtos.HardcoverBooksResponse;
import com.backend.demo.external.hardcover.dtos.HardcoverEditionsResponse;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class HardcoverClient {
    private final RestTemplate restTemplate = new RestTemplate();
    private final String hardcoverUrl = "https://api.hardcover.app/v1/graphql";

    public HardcoverBooksResponse getBooksByTitle(String title, String apiToken) {
        String query = """
                query BooksByUserCount {
                    books(
                          where: {
                              title: {
                                  _eq: "%s"
                              }
                          }
                          order_by: {editions_count: desc}
                    ) {
                          id
                          title
                          description
                          pages
                          release_year
                          default_cover_edition {
                            id
                            image {
                                url
                            }
                          }
                    }
                }""".formatted(title);

        return sendQuery(query, HardcoverBooksResponse.class, apiToken);
    }

    public HardcoverEditionsResponse getEditionsByTitle(String title, String apiToken) throws IOException {
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

        return sendQuery(query, HardcoverEditionsResponse.class, apiToken);
    }

    public HardcoverEditionsResponse getEditionById(String id, String apiToken) {
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

        return sendQuery(query, HardcoverEditionsResponse.class, apiToken);
    }

    public HardcoverEditionsResponse getEditionByIsbn10(String isbn10, String apiToken) {
        String query = """
                query GetEditionByISBN {
                  editions(where: {isbn_10: {_eq: "%s"}}) {
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
                }""".formatted(isbn10);

        return sendQuery(query, HardcoverEditionsResponse.class, apiToken);
    }

    public HardcoverEditionsResponse getEditionByIsbn13(String isbn13, String apiToken) {
        String query = """
                query GetEditionByISBN {
                  editions(where: {isbn_13: {_eq: "%s"}}) {
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
                }""".formatted(isbn13);

        return sendQuery(query, HardcoverEditionsResponse.class, apiToken);
    }

    /**
     * Send request to Hardcover API at the 'hardCoverUrl' field.  This method saves results to database if they don't already exist,
     * to cache data and reduce future requests.  All setup for headers and response entity (RestTemplate) are handled here.
     *
     * @param query     Graphql query String formatted for Hardcover API
     * @param apiToken  Bearer token provided by the frontend client
     * @return DTO object containing Hardcover API response
     */
    private <T> T sendQuery(String query, Class<T> responseType, String apiToken) {
        Map<String, String> body = buildQuery(query);

        HttpHeaders headers = buildHeaders(apiToken);
        headers.add("User-Agent", "Hyperion: (hayden.fish@icloud.com");

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<T> response = restTemplate.exchange(
                hardcoverUrl,
                HttpMethod.POST,
                entity,
                responseType
        );

        return response.getBody();
    }

    private Map<String, String> buildQuery(String query) {
        Map<String, String> body = new HashMap<>();
        body.put("query", query);
        return body;
    }

    private HttpHeaders buildHeaders(String authHeader) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", authHeader);
        return headers;
    }
}
