package com.example.BBGG_Backend.gps.service;

import com.example.BBGG_Backend.gps.repository.MarkRepository;
import com.example.BBGG_Backend.gps.repository.dto.Markdto;
import com.example.BBGG_Backend.gps.repository.entity.Mark;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MarkService {
    private final MarkRepository markRepository;

    public String save(Markdto markdto, HttpServletRequest request){
        markRepository.save(Mark.builder().
                userId((String) request.getSession().getAttribute("id")).
                latitude(markdto.getLatitude()).
                longitude(markdto.getLongitude()).
                text(markdto.getText()).
                img(markdto.getImg()).
                build());
        return "Success";
    }
    public List<Mark> mark(String userId, HttpServletRequest request){
        List<Mark> mark=markRepository.findByUserId(userId);
        return mark;
    }

}