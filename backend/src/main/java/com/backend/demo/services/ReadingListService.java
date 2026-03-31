package com.backend.demo.services;

import com.backend.demo.entities.ReadingList;
import com.backend.demo.exceptions.ResourceNotFoundException;
import com.backend.demo.repositories.ReadingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReadingListService {
    private final ReadingListRepository readingListRepository;

    @Autowired
    public ReadingListService(ReadingListRepository readingListRepository) {
        this.readingListRepository = readingListRepository;
    }

    public List<ReadingList> findAllReadingLists() {
        return readingListRepository.findAll();
    }

    public ReadingList findReadingListById(Long id) {
        Optional<ReadingList> result = readingListRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + id);
        }
        return result.get();
    }

    public ReadingList saveReadingList(ReadingList newReadingList) {
        return readingListRepository.save(newReadingList);
    }

    public void deleteReadingListById(Long id) {
        Optional<ReadingList> result = readingListRepository.findById(id);
        if (result.isEmpty()) {
            throw new ResourceNotFoundException("Unable to find list with id: " + id);
        }
        readingListRepository.deleteById(id);
    }
}
