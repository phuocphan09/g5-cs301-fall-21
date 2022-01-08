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
    String email;


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

//    @GetMapping("/v1/getdisplaypost")
//    public PostRetrievalResponse getMultiplePost (@RequestParam String email) {
//
//        PostRetrievalResponse response = new PostRetrievalResponse();
//        response.setResult("failed");
//        List<Post> posts = postRepository.findByPoster("Imposter");
//
//        List<PostInput> postInputs = new ArrayList<PostInput>();
//        for (Post post: posts) {
//
//            postInputs.add(utils.toPostInput(post));
//        }
//
//        response.setContent(new HashSet<PostInput>(postInputs)); // hack to have an empty set
//
//        List<User> users = userRepository.findByEmail(email);
//        if (users.size() == 0) {
//            System.out.println("No user");
//            return response;
//        } // no user
//
//        List<Interest> interests = utils.findInterestByUser(users.get(0), true);
//        System.out.println("Number of interests matched" + interests.size());
//
//        // oh boy this is gonna be O^2
//        List<Post> posts = postRepository.findAll(); // get all posts
//        for (Interest interest:interests) { // for each interest entry
//
//            for (Post post:posts) {
//
//                String[] interestList = utils.toList(post.getInterestList()); // get the interest list of the post
//
//                if (Arrays.stream(interestList).anyMatch(interest::equals)) { // interests match
//
//                    System.out.println();
//                    if (!response.getContent().contains(post)) {
//                        response.getContent().add(post);
//                    }
//                }
//
//            }
//
//        }
//        return response;
//    }

}
