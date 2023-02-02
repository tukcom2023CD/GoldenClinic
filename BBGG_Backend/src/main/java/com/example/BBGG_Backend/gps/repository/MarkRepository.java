package com.example.BBGG_Backend.gps.repository;

import com.example.BBGG_Backend.gps.repository.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MarkRepository extends JpaRepository<Mark,Long> {
    Optional<Mark> findByUserId(String userId);
}
