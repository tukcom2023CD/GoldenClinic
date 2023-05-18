package com.example.BBGG_Backend.recommend.service;

import com.example.BBGG_Backend.recommend.PlaceRepository;
import com.example.BBGG_Backend.recommend.repository.dto.PlaceDto;
import com.example.BBGG_Backend.recommend.repository.entity.Place;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class RCService {

    @Autowired
    private final PlaceRepository placeRepository;

    public String ps(PlaceDto request){
        placeRepository.save(Place.builder().userId(request.getUserId()).placeName(request.getPlaceName()).address(request.getAddress()).build());
        return "Success";
    }
}
