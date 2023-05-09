package com.example.BBGG_Backend.recommend;

import com.example.BBGG_Backend.login.repository.entity.User;
import com.example.BBGG_Backend.recommend.repository.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByUserId(String userId);
}
