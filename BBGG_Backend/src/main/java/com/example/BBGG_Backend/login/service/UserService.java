package com.example.BBGG_Backend.login.service;

import com.example.BBGG_Backend.login.repository.UserRepository;
import com.example.BBGG_Backend.login.repository.dto.UserDto;
import com.example.BBGG_Backend.login.repository.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    public final UserRepository userRepository;
    public String signup(UserDto request){

        userRepository.save(User.builder()
                .userId(request.getUserId())
                .password(passwordEncoder.encode(request.getPassword()))
                .userName(request.getUserName())
                .build());
        return "Success";
    }
    public String login(String userId, String password) {
        Optional<User> user = userRepository.findByUserId(userId);
        log.info("db password = {}, input password = {}", user.get().getPassword(), password);
        String encodePw=user.get().getPassword();
        if(passwordEncoder.matches(password,encodePw)) {
            return "Success";
        }
        return "Failed";
    }
}
