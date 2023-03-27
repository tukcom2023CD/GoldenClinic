package com.example.BBGG_Backend.gps.service;

import com.example.BBGG_Backend.gps.repository.MarkRepository;
import com.example.BBGG_Backend.gps.repository.dto.Markdto;
import com.example.BBGG_Backend.gps.repository.entity.Mark;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service

@Slf4j
public class MarkService {

    private static final String KAKAO_MAP_API_URL = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=%s&y=%s";
    private final String KAKAO_MAP_API_BASE_URL = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json";
    private final String API_KEY = "86280b843d97a26fbc819a8d0b4b3460"; // 카카오 REST API 키
    //private static final String API_KEY = "86280b843d97a26fbc819a8d0b4b3460";

    @Autowired
    private MarkRepository markRepository;
    private RestTemplate restTemplate;

    public MarkService(){
        this.restTemplate=new RestTemplate();
    }

    public String save(Markdto markdto){
            markRepository.save(Mark.builder().
                    userId(markdto.getUserId()).
                    latitude(markdto.getLatitude()).
                    longitude(markdto.getLongitude()).
                    text(getLocationFromCoordinates(markdto.getLatitude(), markdto.getLongitude())).
                   // area(getBoundaryInfoByCoordinates(markdto.getLatitude(), markdto.getLongitude())).
                    build());
        return "Success";
    }

    public List<Mark> mark(String userId){
        List<Mark> mark=markRepository.findByUserId(userId);
        return mark;
    }

    public List<String> visit(String userId) {
        List<Mark> marks = markRepository.findByUserId(userId);
        Set<String> textSet = new HashSet<>();

        for (Mark mark : marks) {
            String text = mark.getText();
            if (text != null) {
                textSet.add(text);
            }
        }

        return new ArrayList<>(textSet);
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

    public String getBoundaryInfoByCoordinates(double latitude, double longitude) {
        // WGS84 좌표계를 변환하여 TM 좌표계로 변환
        String transCoordUrl = "https://dapi.kakao.com/v2/local/geo/transcoord.json?x=" + longitude + "&y=" + latitude + "&input_coord=WGS84&output_coord=TM";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "KakaoAK " + API_KEY);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(transCoordUrl, HttpMethod.GET, entity, String.class);
        if (response.getStatusCodeValue() == 200) {
            String responseBody = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = null;
            try {
                root = objectMapper.readTree(responseBody);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            JsonNode documents = root.path("documents");
            if (documents.size() > 0) {
                double tmX = documents.get(0).get("x").asDouble();
                double tmY = documents.get(0).get("y").asDouble();
                // TM 좌표계를 입력으로 받아 해당 좌표를 포함하는 지역 검색
                String boundaryUrl = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=" + tmX + "&y=" + tmY;
                ResponseEntity<String> response2 = restTemplate.exchange(boundaryUrl, HttpMethod.GET, entity, String.class);
                if (response2.getStatusCodeValue() == 200) {
                    String responseBody2 = response2.getBody();
                    try {
                        root = objectMapper.readTree(responseBody2);
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                    }
                    documents = root.path("documents");
                    if (documents.size() > 0) {
                        String code = documents.get(0).get("code").asText();
                        // 검색된 지역 코드를 입력으로 받아 해당 지역의 경계 검색
                        String boundaryUrl2 = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=" + code;
                        ResponseEntity<String> response3 = restTemplate.exchange(boundaryUrl2, HttpMethod.GET, entity, String.class);
                        if (response3.getStatusCodeValue() == 200) {
                            String responseBody3 = response3.getBody();
                            try {
                                root = objectMapper.readTree(responseBody3);
                            } catch (JsonProcessingException e) {
                                e.printStackTrace();
                            }
                            documents = root.path("documents");
                            if (documents.size() > 0) {
                                String boundary = documents.get(0).get("region_boundary").get("coordinates").toString();
                                return boundary;
                            }
                        }
                    }
                }
            }
        }
        return null;
    }
}

