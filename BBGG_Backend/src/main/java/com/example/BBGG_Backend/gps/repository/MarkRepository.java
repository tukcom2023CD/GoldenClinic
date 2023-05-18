package com.example.BBGG_Backend.gps.repository;

import com.example.BBGG_Backend.gps.repository.entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarkRepository extends JpaRepository<Mark,Long> {
    List<Mark> findByUserId(String userId);
    List<Mark> findByText(String dong);
}
