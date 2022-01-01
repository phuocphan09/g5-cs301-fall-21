package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.*;
import com.ahhp.notifier.input.Manipulation;
import com.ahhp.notifier.input.PostInput;
import com.ahhp.notifier.repository.InterestRepository;
import com.ahhp.notifier.repository.PostRepository;
import com.ahhp.notifier.repository.UserInterestRepository;
import com.ahhp.notifier.repository.UserRepository;
import com.ahhp.notifier.response.InterestListResponse;
import com.ahhp.notifier.response.AccountValidationResponse;
import com.ahhp.notifier.response.EmailValidationResponse;
import com.ahhp.notifier.response.InterestManipulationResponse;
import com.ahhp.notifier.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class NotifierController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InterestRepository interestRepository;
    @Autowired
    private UserInterestRepository userInterestRepository;
    @Autowired
    private PostRepository postRepository;

    /**
     * Validate the email to make sure it is a Fulbright email
     * @param email to be checked
     * @return EmailValidationResponse.valid is true if contains the required string
     * @return EmailValidationResponse.created is true if email matches an account in the database
     */
    @GetMapping ("/v1/validateemail")
    public EmailValidationResponse validateEmail(@RequestParam String email) {
        final EmailValidationResponse response = new EmailValidationResponse();
        response.setValid(false);
        response.setCreated(false);
        String requiredString = "fulbright.edu.vn";
        if (email.contains(requiredString)) { // valid email
            response.setValid(true);
        }
        List<User> result = userRepository.findByEmail(email);
        if (result.isEmpty()) { // Account not created
            return response;
        } else { // Account created
            response.setCreated(true);
            return response;
        }
    }

    /**
     * Validate the password of a user, complete with hashing and everything.
     * @param user a User body, containing the user password
     * @param email of the user
     * @return AccountValidationResponse.result is true if password is consistent with the database
     * @return AccountValidationResponse.user the email passed in
     */
    @PostMapping ("/v1/validatepassword")
    public AccountValidationResponse validatePassword(@RequestBody User user, @RequestParam String email) {
        AccountValidationResponse response = new AccountValidationResponse(); // create response object
        response.setResult(false);
        response.setUser(email);
        List<User> users = userRepository.findByEmail(email);
        String hashedString = SecurityUtils.hashPassword(user.getPassword());
        if (users.isEmpty()) { // email not registered
            return response;
        } else if (users.get(0).getPassword().equals(hashedString)) { // correct password
            response.setResult(true);
            return response;
        } else { return response; } // email not registered/incorrect password
    }

    /**
     *
     * @param user a User body, containing the user password
     * @param email of the user account to be created
     * @return AccountValidationResponse.result is "ok" if created successfully, "fail" otherwise
     * @return AccountValidationResponse.user the email passed in
     */
    @PostMapping ("/v1/createaccount")
    public AccountValidationResponse createAccount (@RequestBody User user, @RequestParam String email) {
        AccountValidationResponse response = new AccountValidationResponse(); // create response object
        response.setResult(false);
        response.setUser(email);
        EmailValidationResponse validate = validateEmail(email); // validate email
        if (!validate.isCreated()) { // account not created
            if ((validate.isValid() && (user.getPassword().length()>0))) { // valid email address AND nonempty pw
                String hashedString = SecurityUtils.hashPassword(user.getPassword());
                user.setEmail(email); // set the email from url
                user.setPassword(hashedString); // hash the password
                userRepository.save(user);
                response.setResult(true);
                return response;
            } else { // invalid email OR empty password
                return response;
            }

        } else { // account already created
            return response;
        }
    }

    /**
     * Get a list of active interests of a user.
     * @param email of the user, passed through the url param
     * @return InterestListResponse a list of active interests, and the response type
     */
    @GetMapping ("/v1/getactiveinterestlist")
    public InterestListResponse getUserInterestList (@RequestParam String email) {
        InterestListResponse response = new InterestListResponse(); // create response object
        response.setResponseType("individual"); // set response type
        List<User> users = userRepository.findByEmail(email);
        if (users.size() == 0) { // check if a user exists
            return response;
        }
        User user = users.get(0); // find the user in the database
        List<Interest> interests = findInterestByUser(user, true); // get the interest list
        response.setActiveInterestList(interests);
        return response;
    }

    /**
     * Get a list of inactive interests of a user. In other words, addable interests.
     * @param email of the user
     * @return InterestListResponse a list of inactive interests, and the response type
     */
    @GetMapping("/v1/getaddableinterestlist")
    public InterestListResponse getAddableInterestList (@RequestParam String email) {
        InterestListResponse response = new InterestListResponse(); // create response object
        response.setResponseType("individual"); // set response type
        List<User> users = userRepository.findByEmail(email);
        if (users.size() == 0) { // check if a user exists
            return response;
        }
        User user = users.get(0); // find the user in the database
        // get all interest objects NOT IN interestName from the interestRepository
        List<Interest> interests = findInterestByUser(user, false);
        response.setActiveInterestList(interests);
        return response;
    }

    @PutMapping("/v1/manipulateinterest")
    public InterestManipulationResponse manipulateInterest (@RequestBody Manipulation manipulation) {
        InterestManipulationResponse response = new InterestManipulationResponse(); // create response object
        response.setType(manipulation.getType());
        response.setResult("failed");
        List<User> userList = userRepository.findByEmail(manipulation.getInfoPackage().getEmail());// find the user
        if (userList.size()==0) { // no user found
            System.out.print("User not found");
            return response;
        } else { // yes user found
            User user = userList.get(0); // unwrap user
            String interestName = manipulation.getInfoPackage().getInterestName(); // get interestName
            List<Interest> interests = interestRepository.findByInterestName(interestName); // find interest
            if (interests.size()==0) {
                System.out.println("Interest not found");
                return response;
            } // valid interest entry found
            Interest interest = interests.get(0); // unwrap interest
            // if add
            if (manipulation.getType().equals("add")) {
                System.out.println("Adding user interest");
                // add interest
                // check if userInterest entry is already present
                if (userInterestRepository.findByUserAndInterest(user, interest).size() > 0) {
                    System.out.println("Interest already added");
                    return response;
                }
                
                UserInterest userInterest = new UserInterest(); // add new userInterest entry
                userInterest.setUser(user); // set user
                userInterest.setInterest(interest); // set interest for userInterest
                userInterestRepository.save(userInterest); // save the userInterest entry
                response.setResult("success");
                return response;
            } else if (manipulation.getType().equals("remove")) {
                System.out.println("Removing user interest");
                // remove interest
                UserInterest userInterest = new UserInterest();
                userInterest.setInterest(interest);
                userInterest.setUser(user);
                userInterestRepository.delete(userInterest);// delete the corresponding userInterest entry
                response.setResult("success");
                return response;
            } else { // incorrect type parameter
                System.out.println("Unknown Type parameter");
                return response;
            }
        }
    }

    @PostMapping("/v1/submitpost")
    public AccountValidationResponse submitPost(@RequestBody PostInput postInput) {
        AccountValidationResponse response = new AccountValidationResponse();
        response.setResult(false);
        // find by poster
        // find by title
        // check if the post has already been submitted by the user
        List<Post> posts = postRepository.findByPosterAndTitle(postInput.getPoster(), postInput.getTitle());
        if (posts.size() > 0) { // post already submitted by the user
            return response;
        } else { // post not submitted yet
            Post post = new Post(); // create Post entity
            post.setPoster(postInput.getPoster()); // set poster
            post.setTitle(postInput.getTitle()); // set title
            post.setDescription(postInput.getDescription()); // set description
            post.setInterestList(Arrays.toString(postInput.getInterestList())); // turn interestlist to a string
            postRepository.save(post);
            response.setResult(true);
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
            postInput.setInterestList(representationToList(post.getInterestList()));
            return postInput;
        } else { // post is not found, return null
            return null;
        }
    }

    public List<User> getUserFromUserInterest(List<UserInterest> userInterests) {
        String[] emails = new String[userInterests.size()]; // array to store user emails
        for (int i = 0; i < userInterests.size(); i++) { // collect user emails
            emails[i] = userInterests.get(i).getUser().getEmail();
        }
        List<User> users = userRepository.findByEmailIn(emails);
        return users;
    }

    private List<User> findUserByInterest(String interestName) {
        // get the interest entity
        Interest interest = interestRepository.findByInterestName(interestName).get(0);
        // get the list of userInterests from the userInterestRepository
        List<UserInterest> userInterests = userInterestRepository.findByInterest(interest);
        List<String> emails = new ArrayList<String>();
        for (UserInterest userInterest:userInterests) {
            emails.add(userInterest.getUser().getEmail());
        }
        // convert that list of strings into a list of users
        List<User> users = userRepository.findByEmailIn(emails);
        return users;
    }

    private List<Interest> findInterestByUser(User user, boolean isActive) {
        List<UserInterest> userInterests = userInterestRepository.findByUser(user); // get all userInterests
        // get all interest name and put it into a list of string
        List<String> interestNames = new ArrayList<String>();
        for (int i = 0; i < userInterests.size(); i++) {
            interestNames.add(userInterests.get(i).getInterest().getInterestName());
        }
        // get all interest objects from the intererstRepository
        if (isActive) { // get active
            List<Interest> interests = interestRepository.findByInterestNameIn(interestNames);
            return interests;
        } else { // get addable
            if (interestNames.size()==0) { // no active interests yet
                return interestRepository.findAll();
            }
            List<Interest> interests = interestRepository.findByInterestNameNotIn(interestNames);
            return interests;
        }
    }

    private String[] representationToList(String rep) {
        rep = rep.replace("[", "");
        rep = rep.replace("]", "");
        String[] vals = rep.split (",");
        return vals;
    }

    @GetMapping("/v1/getallpost")
    public List<Post> getAllPost() {
        List<Post> posts = postRepository.findAll();
        return posts;
    }

    @GetMapping ("/v1/getalluserinterest") // debug
    // get all userInterests
    public List<UserInterest> getAllOfIt () {
        List<UserInterest> userInterests = userInterestRepository.findAll();
        return userInterests;
    }

    @GetMapping ("/v1/getallinterest") // debug
    public InterestListResponse getAllInterest () {
        InterestListResponse interestResponse = new InterestListResponse();
        interestResponse.setResponseType("all");
        interestResponse.setActiveInterestList(interestRepository.findAll());
        return interestResponse;
    }

    @PostMapping ("/v1/addinterest") // debug
    public String addInterest (@RequestBody Interest interest) {
        try {
            interestRepository.save(interest);
        } catch (Exception e) {
            return e.toString();
        }
        return "Success";
    }

    @GetMapping("/v1/getalluser") // Debug
    // Get all users at once.
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @PutMapping ("/v1/removeuser") // debug
    public boolean removeAccount (@RequestBody User user, @RequestParam String email) {
        boolean result = false;
        EmailValidationResponse validate = validateEmail(email);
        if (!validate.isCreated()) { // account not found
            return result;
        } else { // account found
            List<User> users = userRepository.findByEmail(email);
            if (validatePassword(user, email).isResult()) { // requires correct password
                userRepository.delete(users.get(0));
                result = true;
                return result;
            } else { // incorrect password
                return result;
            }
        }
    }

}