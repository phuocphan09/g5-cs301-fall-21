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

import org.springframework.security.core.context.SecurityContextHolder;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PostController {

    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    Utils utils;
    String email;

    /**
     * Returns a single post from the postRepository with the specified postID,
     * converted to PostRetrievalResponse to match the input post type from the frontend.
     * @param id the id of the post to be retrieved
     * @return PostRetrievalResponse
     */
    @GetMapping("/v1/getpost")
    public PostRetrievalResponse getSinglePost (@RequestParam String id) {

        PostRetrievalResponse response = new PostRetrievalResponse();
        response.setResult("not found");

        Long postId = Long.valueOf(id);
        Optional<Post> post = postRepository.findById(postId); // get the post

        if (post.isPresent()) {

            Post realPost = post.get(); // unwrap post

            response.getContent().add(utils.toPostInput(realPost)); // convert to PostInput formart

            response.setResult("success");
            return response;

        }

        return response;
    }

    /**
     * ???
     * @return
     */
    @GetMapping("/v1/exampleAPI")
    public String debugJWT () {

        // if validated, comes here

        // get email from SecurityContext
        final String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        return email;
    }

    /**
     * Returns a list of posts that are relatable to a particular user, ordered from newest to oldest.
     * Posts are retrieved from the repository as Post, then converted to PostInput
     * to match frontend's configurations.
     * @return PostRetrievalResponse
     */
    @GetMapping("/v1/getdisplaypost")
    public PostRetrievalResponse getDisplayPost () {

        final String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        PostRetrievalResponse response = new PostRetrievalResponse();
        response.setResult("failed");

        List<User> users = userRepository.findByEmail(email); // get user from the email
        if (users.size() == 0) { // no user
            System.out.println("No user");
            return response;}

        User user = users.get(0);
        List<Interest> interests = utils.findInterestByUser(user, true); // get active interest

        List<Post> posts = postRepository.findAllByOrderById(); // order the all the posts by id
        Collections.reverse(posts); // reverse order to get newest posts (largest id) first

        for (Post post: posts) { // for each post

            for (Interest interest: interests) { // for each of the user's interest

                if (post.getInterestList().contains(interest.getInterestName())){ // post's interests contains user's

                    System.out.print("Found post: " + post.getTitle() + " for interest: " + interest.getInterestName()); // debug
                    response.setResult("success");
                    response.getContent().add(utils.toPostInput(post));

                    break; // only add one instance of a post
                }
            }
        }
        return response;
    }

}
