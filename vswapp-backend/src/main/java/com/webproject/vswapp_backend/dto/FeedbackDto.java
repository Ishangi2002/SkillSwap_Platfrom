package com.webproject.vswapp_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class FeedbackDto {
    private Long id;
    private String comment;
    private LocalDateTime addDate;
    private String username;
    private Long userId;
}
