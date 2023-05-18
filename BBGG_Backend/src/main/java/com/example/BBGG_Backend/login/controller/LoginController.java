package com.example.BBGG_Backend.login.controller;

import com.example.BBGG_Backend.login.repository.dto.UserDto;
import com.example.BBGG_Backend.login.repository.entity.User;
import com.example.BBGG_Backend.login.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Optional;

@Slf4j
@RequestMapping("/bbgg")
@RestController
@RequiredArgsConstructor
public class LoginController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody UserDto request) {

        log.info("userId = {}, password = {}, userName = {}", request.getUserId(), request.getPassword(), request.getUserName());
        if (userService.signup(request).equals("Success")) {
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public Optional<User> login(@RequestBody UserDto request, HttpServletRequest httpServletRequest, RedirectAttributes redirectAttributes) {
        HttpSession session = httpServletRequest.getSession();
        log.info("userId = {}, password = {}", request.getUserId(), request.getPassword());
        Optional<User> member = userService.login(request.getUserId(), request.getPassword());
        if (member == null) {
            return null;
        }
        session.setAttribute("id", member.get().getUserId());
        session.setAttribute("pw", member.get().getPassword());
        return member;
    }
    @GetMapping("/logout")
    public String logout(HttpServletResponse response, HttpServletRequest request){
        request.getSession().invalidate();
        request.getSession(true);
        log.info("수행됨");
        return "Success";

    }
}
