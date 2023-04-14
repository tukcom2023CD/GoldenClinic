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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class MarkService {
    private static final String API_URL = "https://api.vworld.kr/2.0/search/";
    private static final String API_KEY = "7F82299F-E3DB-3A90-B881-2EC64DD905A9";
    private static final String REST_API_KEY = "2cbdc0c38d1bf24caf3c8015b9f9e3b2";
    private static final String BASE_URL = "https://dapi.kakao.com";
    private static final String SEARCH_ADDRESS_URI = "/v2/local/search/address.json";


    @Autowired
    private MarkRepository markRepository;
    private RestTemplate restTemplate;
    private ObjectMapper objectMapper;



    public MarkService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper=new ObjectMapper();
    }

    public String save(Markdto markdto) {

        markRepository.save(Mark.builder().
                userId(markdto.getUserId()).
                latitude(markdto.getLatitude()).
                longitude(markdto.getLongitude()).
                text(getLocationFromCoordinates(markdto.getLatitude(), markdto.getLongitude())).
                area(getAddressByQuery(getLocationFromCoordinates(markdto.getLatitude(), markdto.getLongitude())))
                .build());

        return "Success";
    }

    public List<Mark> mark(String userId) {
        List<Mark> mark = markRepository.findByUserId(userId);
        return mark;
    }
    public List<Mark> place(String userId) {
        List<Mark> mark = markRepository.findByText(userId);
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
        String apiKey = "2cbdc0c38d1bf24caf3c8015b9f9e3b2";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + apiKey);

        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
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
        String location =region3depthName;
        return location;
    }
    public static String getAddressByQuery(String query) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + REST_API_KEY);

        UriComponents uri = UriComponentsBuilder.fromHttpUrl(BASE_URL + SEARCH_ADDRESS_URI)
                .queryParam("query", query)
                .build();

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri.toUriString(), HttpMethod.GET, entity, String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
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
            String region1depthName = address.get("h_code").asText();

            return region1depthName;
        } else {
            throw new RuntimeException("Failed to get address information from Kakao API");
        }
    }

}