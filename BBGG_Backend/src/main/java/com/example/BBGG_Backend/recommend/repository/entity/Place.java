package com.example.BBGG_Backend.recommend.repository.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Validated
@Builder
@Getter
@Table
public class Place {
    @Id
    @GeneratedValue
    private long seq;


    @Column
    private String userId;

    @Column(nullable = false)
    private String placeName;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String lat;

    @Column(nullable = false)
    private String longitude;
}
