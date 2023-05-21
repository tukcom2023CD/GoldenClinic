package com.example.BBGG_Backend.recommend.service;

import com.example.BBGG_Backend.recommend.PlaceRepository;
import com.example.BBGG_Backend.recommend.repository.dto.PlaceDto;
import com.example.BBGG_Backend.recommend.repository.entity.Place;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RCService {

    @Autowired
    private final PlaceRepository placeRepository;

    public String ps(PlaceDto request){
        placeRepository.save(Place.builder().userId(request.getUserId()).placeName(request.getPlaceName()).address(request.getAddress())
                .lat(request.getLat()).longitude(request.getLongitude()).build());
        return "Success";
    }
    public List<Place> pp(String id, String dong) {
        return placeRepository.findByUserIdAndAddress(id, dong);
    }
}
