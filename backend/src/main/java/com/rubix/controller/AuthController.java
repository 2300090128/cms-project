package com.rubix.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        // Placeholder logic: always return a fake token
        return ResponseEntity.ok(Map.of("token", "fake-jwt-token-12345"));
    }

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody Map<String, String> userDetails) {
        // Placeholder logic: always return success
        return ResponseEntity.status(201).build();
    }
}
