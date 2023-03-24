package com.example.BBGG_Backend.gps.service;

import com.example.BBGG_Backend.gps.repository.MarkRepository;
import com.example.BBGG_Backend.gps.repository.dto.Markdto;
import com.example.BBGG_Backend.gps.repository.entity.Mark;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MarkService {

    private static final String API_URL = "https://dapi.kakao.com";
    private static final String API_KEY = "86280b843d97a26fbc819a8d0b4b3460";

    private final MarkRepository markRepository;

    public String save(Markdto markdto){
        markRepository.save(Mark.builder().
                userId(markdto.getUserId()).
                latitude(markdto.getLatitude()).
                longitude(markdto.getLongitude()).
                text(getLocationFromCoordinates(markdto.getLatitude(), markdto.getLongitude())).
                build());
        return "Success";
    }

    public List<Mark> mark(String userId){
        List<Mark> mark=markRepository.findByUserId(userId);
        return mark;
    }

    public String getLocationFromCoordinates(double latitude, double longitude) {
        String url = "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" + longitude + "&y=" + latitude + "&input_coord=WGS84";
        String apiKey = "86280b843d97a26fbc819a8d0b4b3460";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + apiKey);

        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        String responseBody = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = null;
        try {
            root = objectMapper.readTree(responseBody);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        JsonNode documents = root.path("documents");
        if (documents.size() == 0) {
            return null;
        }
        JsonNode address = documents.get(0).get("address");
        String region1depthName = address.get("region_1depth_name").asText();
        String region2depthName = address.get("region_2depth_name").asText();
        String region3depthName = address.get("region_3depth_name").asText();
        String location = region1depthName + " " + region2depthName + " " + region3depthName;
        return location;
    }

}
