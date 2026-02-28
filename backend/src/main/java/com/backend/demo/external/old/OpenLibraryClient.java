//package com.backend.demo.external.old;
//
//import com.backend.demo.external.dtos.old.BookCoverMetadata;
//import com.backend.demo.external.dtos.old.BookMetadata;
//import com.backend.demo.external.dtos.old.OpenLibraryDoc;
//import com.backend.demo.external.dtos.old.OpenLibraryResponse;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//public class OpenLibraryClient {
//    private final RestTemplate openLibraryTemplate = new RestTemplate();
//    private final String baseSearchUrl = "https://openlibrary.org/search.json?q=";
//    private final String baseCoverImageUrl = "https://covers.openlibrary.org/b/id/";
//    private final String baseWorkUrl = "https://openlibrary.org/works/";
//
//    public List<BookCoverMetadata> getForTitle(String title, String language) {
//        String url = buildOpenLibraryUrl(title, language); // ISO 3-character standard for language signifiers
//        HttpEntity<String> header = buildUserAgentHeader();
//
//        OpenLibraryResponse response = openLibraryTemplate.getForObject(url, OpenLibraryResponse.class, header);
//
//        List<OpenLibraryDoc> queryResults = response.getDocs();
//
//        return convertDocsToBookCoverMetadata(queryResults);
//    }
//
//    public BookMetadata getDetailsForWork(String workId) {
//        String url = baseWorkUrl + workId + ".json";
//
//        return openLibraryTemplate.getForObject(url, BookMetadata.class);
//    }
//
//    private String buildOpenLibraryUrl(String title, String language) {
//        return baseSearchUrl + buildQuery(title, language);
//    }
//
//    private String buildQuery(String title, String language) {
//        StringBuilder query = new StringBuilder(title.trim());
//
//        if (language != null && !language.isEmpty()) {
//            query.append(" language:").append(language.trim());
//        }
//
//        return query.toString().replace(" ", "+");
//    }
//
//    private HttpEntity<String> buildUserAgentHeader() {
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("User-Agent", "Hyperion (Contact: hayden.fish@icloud.com)");
//
//        return new HttpEntity<>(headers);
//    }
//
//
//    /**
//     * Constructs a response object from our json api results which holds necessary metadata for book covers.
//     * Finds the cover image url for each record if it exists, null if not.
//     *
//     * @param docs Json data obtained from OpenLibrary api call
//     * @return List of response objects holding metadata
//     */
//    private List<BookCoverMetadata> convertDocsToBookCoverMetadata(List<OpenLibraryDoc> docs) {
//        List<BookCoverMetadata> convertedResults = new ArrayList<>();
//
//        for (OpenLibraryDoc doc : docs) {
//            String coverImageUrl = null;
//
//            if (containsCoverImage(doc)) {
//                coverImageUrl = getCoverImageUrl(doc.getCoverI());
//            }
//
//            convertedResults.add(new BookCoverMetadata(doc.getTitle(), doc.getAuthorName(), coverImageUrl, doc.getWorkId()));
//
//        }
//
//        return convertedResults;
//    }
//
//    private boolean containsCoverImage(OpenLibraryDoc doc) {
//        return doc.getCoverI() != null;
//    }
//
//    private String getCoverImageUrl(Integer coverI) {
//        return baseCoverImageUrl + coverI + "-L.jpg"; // "-L" designates image size, see OpenLibrary docs for more info
//    }
//}
