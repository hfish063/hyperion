package com.backend.demo.repositories;

import com.backend.demo.entities.Collaborator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {
    boolean existsBySourceId(int sourceId);
}
