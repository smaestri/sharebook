package com.udemy.demo.jwt;

import com.udemy.demo.configuration.MyUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
public class JwtController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    MyUserDetailService service;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest jwtRequest, HttpServletResponse response) {
        authenticate(jwtRequest.getEmail(), jwtRequest.getPassword());
        MyUserDetailService.UserPrincipal principal = (MyUserDetailService.UserPrincipal) service.loadUserByUsername(jwtRequest.getEmail());
        String token = jwtUtils.generateToken(principal);

        Cookie cookie = new Cookie("token", token);
        response.addCookie(cookie);

        return ResponseEntity.ok(new JwtResponse(principal.getUser().getId(), principal.getUser().getFirstName() + " " + principal.getUser().getLastName()));

    }

    private void authenticate(String email, String password) {
        this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
    }
}