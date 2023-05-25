package com.example.BBGG_Backend.recommend.controller;

import com.example.BBGG_Backend.gps.repository.entity.Mark;
import com.example.BBGG_Backend.recommend.repository.dto.PlaceDto;
import com.example.BBGG_Backend.recommend.repository.entity.Place;
import com.example.BBGG_Backend.recommend.service.RCService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

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
    @GetMapping("/pp")
    @ResponseBody
    public List<Place> pp(@RequestParam String userId,@RequestParam String dong){
        List<Place> p2=rcService.pp(userId,dong);
        return p2;
    }
    @GetMapping("/re_place")
    @ResponseBody
    public List<?> place(@RequestParam String userId){
        List<?> place=rcService.re_place(userId);
        return place;
    }
}
