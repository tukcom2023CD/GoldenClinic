package com.example.BBGG_Backend.recommend.repository.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PlaceDto {
    private String userId;
    private String placeName;
    private String address;
}
