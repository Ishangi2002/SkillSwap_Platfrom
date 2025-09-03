package com.webproject.vswapp_backend.service.impl;

import com.webproject.vswapp_backend.dto.FeedbackDto;
import com.webproject.vswapp_backend.entity.Feedback;
import com.webproject.vswapp_backend.entity.User;
import com.webproject.vswapp_backend.exception.ResourceNotFoundException;
import com.webproject.vswapp_backend.mapper.FeedbackMapper;
import com.webproject.vswapp_backend.repository.UserRepository;
import com.webproject.vswapp_backend.service.FeedbackService;
import com.webproject.vswapp_backend.repository.FeedbackRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;


import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private FeedbackRepository feedbackRepository;
    private UserRepository userRepository;

    @Override
    public FeedbackDto createFeedback(FeedbackDto feedbackDto) {

        User user = userRepository.findById(feedbackDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));


        // Map DTO → Entity
        Feedback feedback = FeedbackMapper.mapToFeedback(feedbackDto,user);

        // Ensure addDate is set to now if null
        if (feedback.getAddDate() == null) {
            feedback.setAddDate(LocalDateTime.now());
        }

        // Save the feedback to DB
        Feedback savedFeedback = feedbackRepository.save(feedback);

        // Map Entity → DTO and return
        return FeedbackMapper.mapToFeedbackDto(savedFeedback);
    }


    @Override
    public FeedbackDto getFeedbackById(Long feedbackId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found for id: " + feedbackId));
        return FeedbackMapper.mapToFeedbackDto(feedback);
    }

    @Override
    public List<FeedbackDto> getAllFeedback() {
        List<Feedback> feedbackList = feedbackRepository.findAll();
        return feedbackList.stream()
                .map(FeedbackMapper::mapToFeedbackDto)
                .collect(Collectors.toList());
    }

    @Override
    public FeedbackDto updateFeedback(Long feedbackId, FeedbackDto updatedFeedback) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found for id: " + feedbackId));

        feedback.setComment(updatedFeedback.getComment());
        feedback.setAddDate(updatedFeedback.getAddDate());

        Feedback updatedFeedbackObj = feedbackRepository.save(feedback);
        return FeedbackMapper.mapToFeedbackDto(updatedFeedbackObj);
    }


    @Override
    public void deleteFeedback(Long feedbackId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found for id: " + feedbackId));

        feedbackRepository.deleteById(feedbackId);
    }
}
