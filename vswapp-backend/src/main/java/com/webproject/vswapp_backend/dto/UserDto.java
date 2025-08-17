package com.webproject.vswapp_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {
    private Long id;
    private  String email;
    private String password;
    private LocalDateTime createdAt;
    private String firstname;
    private String lastname;
    private String profilePicture;
}
