package com.example.BBGG_Backend.gps.controller;

import com.example.BBGG_Backend.gps.repository.dto.Markdto;
import com.example.BBGG_Backend.gps.repository.entity.Mark;
import com.example.BBGG_Backend.gps.service.MarkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Slf4j
@RequestMapping("/gps")
@RestController
@RequiredArgsConstructor
public class GpsController {
    private final MarkService markService;

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody Markdto markdto, HttpServletRequest request) {
        if(markService.save(markdto,request).equals("Success")){
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus. BAD_REQUEST);
    }
    @GetMapping("/mark")
    @ResponseBody
    public List<Mark> mark( HttpServletRequest request){
        List<Mark> mark=markService.mark((String) request.getSession().getAttribute("id"),request);
        return mark;
    }
}