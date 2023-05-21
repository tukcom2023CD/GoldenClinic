package com.example.BBGG_Backend.recommend;

import com.example.BBGG_Backend.gps.repository.entity.Mark;
import com.example.BBGG_Backend.login.repository.entity.User;
import com.example.BBGG_Backend.recommend.repository.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByUserIdAndAddress(String userId, String address);
    List<Place> findByUserId(String userId);
}
