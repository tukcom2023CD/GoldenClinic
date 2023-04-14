package com.example.BBGG_Backend.gps.controller;

import com.example.BBGG_Backend.gps.repository.dto.Markdto;
import com.example.BBGG_Backend.gps.repository.entity.Mark;
import com.example.BBGG_Backend.gps.service.MarkService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequestMapping("/gps")
@RestController

public class GpsController {

    @Autowired
    private  MarkService markService;
    @PostMapping("/save")
    public ResponseEntity save(@RequestBody Markdto markdto,@RequestParam("file") MultipartFile file) throws IOException {
        if(markService.save(markdto,file.getBytes()).equals("Success")){
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus. BAD_REQUEST);
    }
    @GetMapping("/mark")
    @ResponseBody
    public List<Mark> mark(@RequestParam String userId){
        List<Mark> mark=markService.mark(userId);
        return mark;
    }
    @GetMapping("/visited_place")
    @ResponseBody
    public List<?> visit(@RequestParam String userId){
        List<?> visit=markService.visit(userId);
        return visit;
    }
    @GetMapping("/place")
    @ResponseBody
    public List<Mark> place(@RequestParam String dong){
        List<Mark> place=markService.place(dong);
        return place;
    }
}