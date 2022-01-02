package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.Interest;
import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.entity.UserInterest;
import com.ahhp.notifier.input.PostInput;
import com.ahhp.notifier.mailingService.MailingService;
import com.ahhp.notifier.repository.InterestRepository;
import com.ahhp.notifier.repository.PostRepository;
import com.ahhp.notifier.repository.UserInterestRepository;
import com.ahhp.notifier.repository.UserRepository;
import com.ahhp.notifier.response.AccountValidationResponse;
import com.ahhp.notifier.response.PostSubmissionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.InvalidParameterException;
import java.util.*;

@RestController
public class MailingController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PostRepository postRepository;
    @Autowired
    InterestRepository interestRepository;
    @Autowired
    UserInterestRepository userInterestRepository;
    @Autowired
    MailingService mailingService;

    @PostMapping("/v1/submitpost")
    public PostSubmissionResponse submitPost(@RequestBody PostInput postInput) {

        PostSubmissionResponse response = new PostSubmissionResponse();
        response.setAdded(false);
        response.setAdded(false);
        List<Post> posts = postRepository.findByPosterAndTitle(postInput.getPoster(), postInput.getTitle());

        if (posts.size() > 0) { // post already submitted by the user
            response.setDetails("Post with the same title already created by this user.");
            return response;

        } else { // post not submitted yet
            Post post = new Post(); // create Post entity
            post.setPoster(postInput.getPoster()); // set poster
            post.setTitle(postInput.getTitle()); // set title
            post.setDescription(postInput.getDescription()); // set description

            post.setInterestList(Arrays.toString(postInput.getInterestList())); // turn interestlist[] to a string

            postRepository.save(post);

            response.setAdded(true);

            // send the damn emails
            int userNum = sendEmail(postInput.getInterestList(), post);
            if (userNum > 0) {
                response.setEmailSent(true);
            }

            response.setDetails("Email sent to " + userNum + " recipients.");
            return response;
        }
    }

    @GetMapping("/v1/getpost")
    public PostInput getPost(@RequestParam String postId) {

        Optional<Post> posts = postRepository.findById(Long.valueOf(postId));
        PostInput postInput = new PostInput();

        if (posts.isPresent()) { // post is found

            Post post = posts.get();
            postInput.setPoster(post.getPoster());
            postInput.setDescription(post.getDescription());
            postInput.setTitle(post.getTitle());
            postInput.setInterestList(ToList(post.getInterestList())); // convert from string to string[]

            return postInput;
        } else { // post is not found, return null
            return null;
        }
    }

    private int sendEmail(String[] interests, Post post) {

        int recipientNum = 0;
        Map<String, List<String>> dict = new HashMap<String, List<String>>();

        for (String interest:interests) {

            try {
                List<User> users = findUserByInterest(interest);
                recipientNum = users.size();

                for (User user : users) {
                    // user added in dictionary
                    if (dict.containsKey(user.getEmail())) {

                        dict.get(user.getEmail()).add(interest); // add the interest list for the user

                    } else {

                        dict.put(user.getEmail(), new ArrayList<String>());
                        dict.get(user.getEmail()).add(interest); // add the interest list for the user
                    }

                }

            } catch (Exception e) {
                System.out.println(e.toString());
            }
        }

        // send email for each user, including the interests
        for (String recipient:dict.keySet()) {

            try {
                mailingService.sendMimeMessage(post, recipient, dict.get(recipient));
            } catch (Exception e) {
                System.out.println(e.toString());
            }
        }
        return recipientNum;

    }

    private String[] ToList(String rep) {
        rep = rep.replace("[", "");
        rep = rep.replace("]", "");
        String[] vals = rep.split (",");
        return vals;
    }

    private List<User> findUserByInterest(String interestName) throws InvalidParameterException {

        List<Interest> interests = interestRepository.findByInterestName(interestName);
        if (interests.size() > 0) {
            Interest interest = interests.get(0);

            // get the list of userInterests from the userInterestRepository
            List<UserInterest> userInterests = userInterestRepository.findByInterest(interest);
            List<String> emails = new ArrayList<String>();

            for (UserInterest userInterest : userInterests) {
                emails.add(userInterest.getUser().getEmail());
            }

            // convert that list of strings into a list of users
            List<User> users = userRepository.findByEmailIn(emails);
            return users;
        } else {
            throw new InvalidParameterException("Invalid interest name: " + interestName);
        }
    }

    public static <T> int getLength(T[] arr){
        int count = 0;
        for(T el : arr)
            if (el != null)
                ++count;
        return count;
    }

}
