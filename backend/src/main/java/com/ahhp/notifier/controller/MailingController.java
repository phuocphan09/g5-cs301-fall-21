package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.input.PostInput;
import com.ahhp.notifier.service.EmailSender;
import com.ahhp.notifier.repository.PostRepository;
import com.ahhp.notifier.response.PostSubmissionResponse;
import com.ahhp.notifier.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import org.springframework.security.core.context.SecurityContextHolder;


//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MailingController {

    @Autowired
    PostRepository postRepository;
    @Autowired
    EmailSender emailSender;
    @Autowired
    Utils utils;

    @PostMapping("/v1/submitpost")
    public PostSubmissionResponse submitPost(@RequestBody PostInput postInput,
                                             @RequestParam(defaultValue = "false") boolean send) {

        PostSubmissionResponse response = new PostSubmissionResponse();
        response.setAdded(false);
        response.setAdded(false);

        final String poster = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        List<Post> posts = postRepository.findByPosterAndTitle(poster, postInput.getTitle());

        if (posts.size() > 0) { // post already submitted by the user
            response.setDetails("Post with the same title already created by this user.");
            return response;

        } else { // post not submitted yet
            Post post = new Post(); // create Post entity
            post.setPoster(poster); // set poster
            post.setTitle(postInput.getTitle()); // set title
            post.setDescription(postInput.getDescription()); // set description
            post.setTimeStamp(System.currentTimeMillis()); // set timestamp

            post.setInterestList(Arrays.toString(postInput.getInterestList())); // turn interestlist[] to a string

            postRepository.save(post);

            response.setAdded(true);

            if (send) {

                // send the damn emails
                int userNum = emailSender.sendEmail(postInput.getInterestList(), post);
                if (userNum > 0) { // more than 1 users to send
                    response.setEmailSent(true);
                    response.setDetails("Email sent to " + userNum + " recipients."); // log

                } else {
                    response.setDetails("No user to send");
                }
            } else {
                response.setDetails("Emails not sent");
            }

            return response;
        }
    }
}
