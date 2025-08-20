package com.webproject.vswapp_backend.mapper;

import com.webproject.vswapp_backend.dto.FeedbackDto;
import com.webproject.vswapp_backend.entity.Feedback;

public class FeedbackMapper {

    // Entity → DTO
    public static FeedbackDto mapToFeedbackDto(Feedback feedback) {
        if (feedback == null) return null;

        String username = "Anonymous";

        if (feedback.getUser() != null && feedback.getUser().getUserDetails() != null) {
            String first = feedback.getUser().getUserDetails().getFirstname();
            String last = feedback.getUser().getUserDetails().getLastname();

            if ((first != null && !first.isEmpty()) || (last != null && !last.isEmpty())) {
                username = (first != null ? first : "") +
                        (last != null ? " " + last : "");
                username = username.trim();
            }
        }

        return new FeedbackDto(
                feedback.getId(),
                feedback.getComment(),
                feedback.getAddDate(),
                username
        );
    }

    // DTO → Entity
    public static Feedback mapToFeedback(FeedbackDto dto) {
        Feedback feedback = new Feedback();
        feedback.setId(dto.getId());
        feedback.setComment(dto.getComment());
        feedback.setAddDate(dto.getAddDate());
        return feedback;
    }
}
