package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.Interest;
import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.entity.UserInterest;
import com.ahhp.notifier.repository.InterestRepository;
import com.ahhp.notifier.repository.UserInterestRepository;
import com.ahhp.notifier.repository.UserRepository;
import com.ahhp.notifier.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;

@RestController
public class NotifierController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InterestRepository interestRepository;
    @Autowired
    private UserInterestRepository userInterestRepository;

    @GetMapping ("/v1/validateemail")
    public Response validateEmail(@RequestParam String email) {
        final Response response = new Response();
        response.setValid(false);
        response.setCreated(false);
        if (email.contains("fulbright.edu.vn")) { // valid email
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

    @GetMapping ("/v1/validatepassword")
    public boolean validatePassword(@RequestBody User user, @RequestParam String email) {
        boolean result = false;
        List<User> users = userRepository.findByEmail(email);
        String hashedString = SecurityUtils.hashPassword(user.getPassword());
        if (users.isEmpty()) { // email not registered
            return result;
        } else if (users.get(0).getPassword().equals(hashedString)) { // correct password
            result = true;
            return result;
        } else { return result; } // email not registered/incorrect password
    }

    @PostMapping ("/v1/createaccount")
    public boolean createAccount (@RequestBody User newUser, @RequestParam String email) {
        boolean result = false;
        Response validate = validateEmail(email);
        if (!validate.isCreated()) { // account not created
            if ((validate.isValid() && (newUser.getPassword().length()>0))) { // valid email address AND nonempty pw
                String hashedString = SecurityUtils.hashPassword(newUser.getPassword());
                newUser.setEmail(email); // set the email from url
                newUser.setPassword(hashedString); // hash the password
                userRepository.save(newUser);
                result = true;
                return result;
            } else { // invalid email OR empty password
                return result;
            }

        } else { // account already created
            return result;
        }
    }

    @GetMapping("/v1/users") // Debug
    // Get all users at once.
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping ("/v1/removeaccount") // debug
    public boolean removeAccount (@RequestBody User user, @RequestParam String email) {
        boolean result = false;
        Response validate = validateEmail(email);
        if (!validate.isCreated()) { // account not found
            return result;
        } else { // account found
            List<User> users = userRepository.findByEmail(email);
            if (validatePassword(user, email)) { // requires correct password
                userRepository.delete(users.get(0));
                result = true;
                return result;
            } else { // incorrect password
                return result;
            }
        }
    }

    @GetMapping ("/v1/getallinterestlist") // get a list of all interests
    public InterestResponse getAllInterest () {
        InterestResponse interestResponse = new InterestResponse();
        interestResponse.setResponse_type("all");
        interestResponse.setInterest_list(interestRepository.findAll());
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

//    @GetMapping ("v1/getinterestlist")
//    public InterestResponse getUserInterestList (@RequestParam String email) {
//        // Validate the email
//        // Find the user in the database
//        InterestResponse interestResponse = new InterestResponse();
//        interestResponse.setResponse_type("individual"); // set the response type
//        User user = userRepository.findByEmail(email).get(0);
//        List<Interest> interests = userInterestRepository.findByUser(user);
//        interestResponse.setInterest_list(interests);
//        return interestResponse;
//        // Get the userInterests in the intersection table using the user
//        // Return the list of all interests
//    }

    @GetMapping ("v1/get")
    public User get (@RequestParam String email) {
        // Validate the email
        // Find the user in the database
        InterestResponse interestResponse = new InterestResponse();
        interestResponse.setResponse_type("individual"); // set the response type
        List<Interest> interests = interestResponse.getInterest_list();
        User user = userRepository.findByEmail(email).get(0);
        try { // try getting out the interest to put into the List
            List<UserInterest> userInterests = userInterestRepository.findByUser(user);
            for (int i = 0; i < userInterests.size(); i++) { // add the interests
                System.out.println(userInterests.get(i).getInterest().getInterestName());
                interests.add(userInterests.get(i).getInterest());
            }
        } catch (Exception e) {
            System.out.println(e.toString());
        }
//        for (int i = 0; i < userInterests.size(); i++) {
//            interestResponse.getInterest_list().add(userInterests.get(i).getInterest());
//        }
        return user;
            // Get the userInterests in the intersection table using the user
            // Return the list of all interests
        }

        @GetMapping ("/v1/getall/") // debug
        // get all userInterests
        public List<UserInterest> getAllOfIt () {
            List<UserInterest> userInterests = userInterestRepository.findAll();
            return userInterests;
        }

        @PostMapping ("v1/manipulateinterest") // currently add new interest to user
        public String manipulateInterest (@RequestBody Interest interest, @RequestParam String email) {
            // WRITE A METHOD TO VALIDATE IF THE INTEREST BEING ADDED ACTUALLY EXISTS
            try {
                List<User> users = userRepository.findByEmail(email);
                if (users.size() == 0) {
                    return "No user";
                }
                User user = users.get(0);
                // find the interest
                List<Interest> interests = interestRepository.findByInterestName(interest.getInterestName());
                if (interests.size()==0) {
                    return "No interest to speak of";
                }
                interest = interests.get(0);
                UserInterest userInterest = new UserInterest();
                userInterest.setUser(user);
                userInterest.setInterest(interest);
            userInterestRepository.save(userInterest);
            return "saved successfully";
        } catch (Exception e) {
            System.out.print(e.toString());
        }
        return "saved Success";
    }
}