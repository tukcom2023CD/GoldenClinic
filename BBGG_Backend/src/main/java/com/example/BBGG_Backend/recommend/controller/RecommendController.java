package com.example.BBGG_Backend.recommend.controller;

import com.example.BBGG_Backend.recommend.repository.dto.PlaceDto;
import com.example.BBGG_Backend.recommend.service.RCService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;

@Slf4j
@RequestMapping("/bbgg")
@RestController
@RequiredArgsConstructor
public class RecommendController {
    private final RCService rcService;

    @PostMapping("/placesave")
    public ResponseEntity ps(@RequestBody PlaceDto re){
        if (rcService.ps(re).equals("Success")) {
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
