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
import com.ahhp.notifier.utils.JwtUtils;
import com.ahhp.notifier.utils.SecurityUtils;
import com.ahhp.notifier.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;


import org.springframework.http.HttpStatus;

import javax.servlet.http.Cookie;
import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InterestRepository interestRepository;
    @Autowired
    private UserInterestRepository userInterestRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private Utils utils;
    @Autowired
    private JwtUtils jwtUtils;

    /**
     * Validate the email to make sure it is a Fulbright email.
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
        // String requiredString = "@";

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
     * Validate the password of a user, complete with hashing and everything
     * returns a JWT for the user to authenticate in subsequent requests.
     * @param user a User body, containing the user password
     * @param email of the user
     * @return AccountValidationResponse.result is true if password is consistent with the database
     * @return AccountValidationResponse.user the email passed in
     */
    @PostMapping ("/v1/validatepassword")
    public ResponseEntity<AccountValidationResponse> validatePassword(@RequestBody User user, @RequestParam String email, HttpServletResponse response) {

        AccountValidationResponse theResponse = new AccountValidationResponse(); // create response object
        theResponse.setResult(false);
        theResponse.setUser(email);

        List<User> users = userRepository.findByEmail(email);

        String hashedString = SecurityUtils.hashPassword(user.getPassword());

        if (users.isEmpty()) { // email not registered

            return new ResponseEntity<AccountValidationResponse> (theResponse, HttpStatus.OK);

        } else if (users.get(0).getPassword().equals(hashedString)) { // correct password

            // create token
            String token = jwtUtils.createJWT(email, 2592000);
            Cookie cookie = new Cookie("Authorization", token);
            cookie.setPath("/");  // The cookie is visible to all the pages in the directory you specify, and all the pages in that directory's subdirectories
            cookie.setHttpOnly(true);
            response.addCookie(cookie);

            // set result to true
            theResponse.setResult(true);

            // return
            return new ResponseEntity<AccountValidationResponse> (theResponse, HttpStatus.OK);

        } else {

            return new ResponseEntity<AccountValidationResponse> (theResponse, HttpStatus.OK);

        } // email not registered/incorrect password
    }

    /**
     * Create an account for a user in the database, returns a JWT for the user
     * to authenticate in subsequent requests.
     * @param user a User body, containing the user password
     * @param email of the user account to be created
     * @return AccountValidationResponse.result
     */
    @PostMapping ("/v1/createaccount")
    @ResponseBody
    public ResponseEntity createAccount (@RequestBody User user, @RequestParam String email, HttpServletResponse response) {

        AccountValidationResponse theReponse = new AccountValidationResponse(); // create response object
        theReponse.setResult(false);
        theReponse.setUser(email);

        // for serious debugging purposes
//        System.out.println("hello");
//        System.out.println("hello");
//        System.out.println("hello");
//        System.out.println(email);

        EmailValidationResponse validate = validateEmail(email); // validate email

        if (!validate.isCreated()) { // account not created

            if ((validate.isValid() && (user.getPassword().length()>0))) { // valid email address AND nonempty pw

                String hashedString = SecurityUtils.hashPassword(user.getPassword());
                user.setEmail(email); // set the email from url
                user.setPassword(hashedString); // hash the password

                userRepository.save(user); // save user to DB

                // generate token and respond
                String token = jwtUtils.createJWT(email, 2592000);
                Cookie cookie = new Cookie("Authorization", token);
                cookie.setPath("/");  // The cookie is visible to all the pages in the directory you specify, and all the pages in that directory's subdirectories
                cookie.setHttpOnly(true);
                response.addCookie(cookie);

                theReponse.setResult(true);

                // return
                return new ResponseEntity<AccountValidationResponse> (theReponse, HttpStatus.OK);

            } else { // invalid email OR empty password

                return null;

            }

        } else { // account already created

            return null;

        }
    }

    /**
     * Get a list of active interests of a user.
     * @param email of the user, passed through the url param
     * @return InterestListResponse a list of active interests, and the response type
     */
    @GetMapping ("/v1/getactiveinterestlist")
    public InterestListResponse getUserInterestList () {

        InterestListResponse response = new InterestListResponse(); // create response object
        response.setResponseType("individual"); // set response type

        final String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        List<User> users = userRepository.findByEmail(email);

        if (users.size() == 0) { // check if a user exists
            return response;
        }

        User user = users.get(0); // find the user in the database

        List<Interest> interests = utils.findInterestByUser(user, true); // get the interest list

        response.setActiveInterestList(interests);

        return response;
    }

    /**
     * Get a list of inactive interests of a user specified in the JWT. In other words, addable interests.
     * @return InterestListResponse a list of inactive interests, and the response type
     */
    @GetMapping("/v1/getaddableinterestlist")
    public InterestListResponse getAddableInterestList() throws InvalidParameterException {

        final String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        InterestListResponse response = new InterestListResponse(); // create response object
        response.setResponseType("individual"); // set response type
        List<User> users = userRepository.findByEmail(email);

        if (users.size() == 0) { // check if a user exists
            throw new InvalidParameterException("Email:" + email); // does not exist
        }

        User user = users.get(0); // find the user in the database

        // get all interest objects NOT IN interestName from the interestRepository
        List<Interest> interests = utils.findInterestByUser(user, false);
        response.setAddableInteresList(interests); // set the addable interest list

        return response;
    }

    /**
     * Add or remove a user's interest in the database,
     * depending on whether manipulation.getType() is 'add' or 'remove'.
     * @param manipulation containing the interest object and what to do with it (add/remove)
     * @return InterestManipulationResponse
     */
    @PutMapping("/v1/manipulateinterest")
    public InterestManipulationResponse manipulateInterest (@RequestBody Manipulation manipulation) {

        InterestManipulationResponse response = new InterestManipulationResponse(); // create response object
        response.setType(manipulation.getType());
        response.setResult("failed");

        final String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        List<User> userList = userRepository.findByEmail(email);// find the user

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

            if (manipulation.getType().equals("add")) {

                System.out.println("Adding user interest");
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

                List<UserInterest> userInterests = userInterestRepository.
                        findByUserAndInterest(user,interest); // find in the database
                UserInterest userInterest = userInterests.get(0); // get the entry

                System.out.println("Entry is: " + userInterest.getUser().getEmail()
                        + " with " + userInterest.getInterest().getInterestName()); // logging

                userInterestRepository.deleteById(userInterest.getId()); // delete by id, not by entity

                response.setResult("success");
                return response;

            } else { // incorrect type parameter

                System.out.println("Unknown Type parameter");
                return response;
            }
        }
    }

    /**
     * Set the 'Authorization' field in HttpServletResponse's cookie to null,
     * and set that user's JWT's loggedOut to True.
     * @param response the HttpServletResponse entity to set
     * @return ResponseEntity<String> standard response entity
     */
    @GetMapping("/v1/logout")
    public ResponseEntity<String> logOut(HttpServletResponse response) {

//        final String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        // create token
        Cookie cookie = new Cookie("Authorization", null);
        cookie.setPath("/");  // The cookie is visible to all the pages in the directory you specify, and all the pages in that directory's subdirectories
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

        // return
        return new ResponseEntity<String> ("ok", HttpStatus.OK);
    }

    /**
     * Returns a string True if the token is valid, which is always the case when this method is called.
     * @return
     */
    @GetMapping("/v1/authenticatetoken")
    public String authenticateToken() {

        return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

    }

    @GetMapping("/v1/getallpost") // debug
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

    @PostMapping ("/v1/deleteinterest") // debug
    public String deleteInterest (@RequestBody Interest interest) {
        try {
            interestRepository.delete(interest);
        } catch (Exception e) {
            return e.toString();
        }
        return "Success";
    }

    @GetMapping("/v1/getalluser") // debug
    // Get all users at once.
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @PutMapping("/v1/removeallpost")
    public boolean removeAllPost() {
        try {
            postRepository.deleteAll();
            return true;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    @PutMapping("/v1/removeuser")
    public boolean removeUser(@RequestParam String email) {
        List<User> users = userRepository.findByEmail(email);
        try {
            userRepository.delete(users.get(0));
            return true;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

}