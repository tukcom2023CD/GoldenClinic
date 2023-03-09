package com.example.BBGG_Backend.gps.repository;

import com.example.BBGG_Backend.gps.repository.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarkRepository extends JpaRepository<Mark,Long> {
    List<Mark> findByUserId(String userId);
}
