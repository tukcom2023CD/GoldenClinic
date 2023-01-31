package com.example.BBGG_Backend.login.repository.entity;

import com.example.BBGG_Backend.login.repository.dto.UserDto;
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
public class User {

    @GeneratedValue
    private long seq;
    
    @Id
    @Column(unique = true)
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String userName;

    public UserDto toDto(){
        return UserDto.builder()
                .userId(userId)
                .password(password)
                .userName(userName)
                .build();
    }
}