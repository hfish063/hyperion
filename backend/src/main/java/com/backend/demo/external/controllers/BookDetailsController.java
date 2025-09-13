package com.backend.demo.external.controllers;

import com.backend.demo.external.HardcoverClient;
import com.backend.demo.external.dtos.Edition;
import com.backend.demo.external.dtos.HardcoverEditionsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/meta/")
@CrossOrigin(origins = "http://localhost:3000")
public class BookDetailsController {
    private final HardcoverClient hardcoverClient;

    @Autowired
    public BookDetailsController(HardcoverClient hardcoverClient) {
        this.hardcoverClient = hardcoverClient;
    }

    @GetMapping("search/{title}")
    public List<Edition> getEditionsByTitle(@PathVariable("title") String title,
                                            @RequestParam(defaultValue = "50") int limit,
                                            @RequestParam(defaultValue = "0") int offset) throws IOException {
        HardcoverEditionsResponse response = hardcoverClient.getEditionsByTitle(title);
        List<Edition> editions = response.getData().getEditions();

        if (offset >= editions.size()) {
            return new ArrayList<>(Collections.emptyList());
        }

        int end = Math.min(offset + limit, editions.size());

        return editions.subList(offset, end);
    }
}
