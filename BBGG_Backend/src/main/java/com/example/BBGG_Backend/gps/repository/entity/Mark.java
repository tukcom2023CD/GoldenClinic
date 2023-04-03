package com.example.BBGG_Backend.gps.repository.entity;

import com.example.BBGG_Backend.gps.repository.dto.Markdto;
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
public class Mark extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private long seq;
    @Column
    private String userId;
    @Column
    private double latitude;
    @Column(nullable = false)
    private double longitude;
    @Column
    private String text;
    @Column
    private byte[] img;
    @Column
    private String area;




    public Markdto markdto(){
        return Markdto.builder()
                .latitude(latitude)
                .longitude(longitude)
                .text(text)
                .build();
    }
}
