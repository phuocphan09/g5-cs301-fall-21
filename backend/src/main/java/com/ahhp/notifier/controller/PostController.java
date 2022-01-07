package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.Interest;
import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.input.PostInput;
import com.ahhp.notifier.repository.InterestRepository;
import com.ahhp.notifier.repository.PostRepository;
import com.ahhp.notifier.repository.UserRepository;
import com.ahhp.notifier.response.PostRetrievalResponse;
import com.ahhp.notifier.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PostController {

    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    Utils utils;

    @GetMapping("/v1/getpost")
    public PostRetrievalResponse getSinglePost (@RequestParam String id) {

        PostRetrievalResponse response = new PostRetrievalResponse();
        response.setResult("not found");
        // response.setContent(postRepository.findByPoster("Imposter")); // hack to have an empty set

        Long postId = Long.valueOf(id);
        Optional<Post> post = postRepository.findById(postId); // get the post

        if (post.isPresent()) {

            Post realPost = post.get(); // unwrap post

            response.getContent().add(utils.toPostInput(realPost));

            response.setResult("success");
            return response;

        }

        return response;
    }

    @GetMapping("/v1/getdisplaypost")
    public PostRetrievalResponse getDisplayPost (@RequestParam String email) {

        PostRetrievalResponse response = new PostRetrievalResponse();
        response.setResult("failed");

        List<User> users = userRepository.findByEmail(email);
        if (users.size() == 0) { // no user
            System.out.println("No user");
            return response;}

        User user = users.get(0);
        List<Interest> interests = utils.findInterestByUser(user, true); // get active interest

        for (Post post: postRepository.findAllByOrderById()) { // for each post

            for (Interest interest: interests) { // for each of the user's interest

                if (post.getInterestList().contains(interest.getInterestName()) &&
                        !response.getContent().contains(post)) { // post's interests contains user's

                    System.out.print("Found post: " + post.getTitle() + " for interest: " + interest.getInterestName()); // debug
                    response.setResult("success");
                    response.getContent().add(utils.toPostInput(post));
                }
            }
        }
        return response;
    }

}
