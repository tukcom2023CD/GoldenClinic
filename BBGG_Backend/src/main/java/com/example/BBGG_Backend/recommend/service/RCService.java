package com.example.BBGG_Backend.recommend.service;

import com.example.BBGG_Backend.recommend.PlaceRepository;
import com.example.BBGG_Backend.recommend.repository.dto.PlaceDto;
import com.example.BBGG_Backend.recommend.repository.entity.Place;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class RCService {


    @Autowired
    private PlaceRepository placeRepository;
    private RestTemplate restTemplate;
    private  ObjectMapper objectMapper;

    public RCService(){
        this.restTemplate = new RestTemplate();
        this.objectMapper=new ObjectMapper();
    }

    public String ps(PlaceDto request){
        Map<String, String> location = getLocationFromCoordinates(request.getAddress());
        placeRepository.save(Place.builder().userId(request.getUserId()).placeName(request.getPlaceName()).address(request.getAddress())
                .lat(location.get("x")).longitude(location.get("y")).build());
        return "Success";
    }
    public List<Place> pp(String id, String dong) {
        return placeRepository.findByUserIdAndAddress(id, dong);
    }
    public Map<String, String> getLocationFromCoordinates(String address) {
        String url = "https://dapi.kakao.com/v2/local/search/address.json?query=" + address;
        String apiKey = "2cbdc0c38d1bf24caf3c8015b9f9e3b2";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + apiKey);

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        String responseBody = response.getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root;
        try {
            root = objectMapper.readTree(responseBody);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
        JsonNode documents = root.path("documents");
        if (documents.size() == 0) {
            return null;
        }

        JsonNode addressNode = documents.get(0).get("address");
        String x = addressNode.get("x").asText();
        String y = addressNode.get("y").asText();

        Map<String, String> locationMap = new HashMap<>();
        locationMap.put("x", x);
        locationMap.put("y", y);
        return locationMap;
    }

}
