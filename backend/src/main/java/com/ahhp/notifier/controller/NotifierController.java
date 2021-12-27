package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.Interest;
import com.ahhp.notifier.entity.Manipulation;
import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.entity.UserInterest;
import com.ahhp.notifier.repository.InterestRepository;
import com.ahhp.notifier.repository.UserInterestRepository;
import com.ahhp.notifier.repository.UserRepository;
import com.ahhp.notifier.response.InterestListResponse;
import com.ahhp.notifier.response.AccountValidationResponse;
import com.ahhp.notifier.response.EmailValidationResponse;
import com.ahhp.notifier.response.InterestManipulationResponse;
import com.ahhp.notifier.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping ("/v1/validateemail")
    public EmailValidationResponse validateEmail(@RequestParam String email) {
        final EmailValidationResponse response = new EmailValidationResponse();
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

    @PostMapping ("/v1/createaccount")
    public AccountValidationResponse createAccount (@RequestBody User newUser, @RequestParam String email) {
        AccountValidationResponse response = new AccountValidationResponse(); // create response object
        response.setResult(false);
        response.setUser(email);
        EmailValidationResponse validate = validateEmail(email); // validate email
        if (!validate.isCreated()) { // account not created
            if ((validate.isValid() && (newUser.getPassword().length()>0))) { // valid email address AND nonempty pw
                String hashedString = SecurityUtils.hashPassword(newUser.getPassword());
                newUser.setEmail(email); // set the email from url
                newUser.setPassword(hashedString); // hash the password
                userRepository.save(newUser);
                response.setResult(true);
                return response;
            } else { // invalid email OR empty password
                return response;
            }

        } else { // account already created
            return response;
        }
    }

    @GetMapping ("v1/getinterestlist")
    public List<UserInterest> getUserInterestList (@RequestParam String email) {
        User user = userRepository.findByEmail(email).get(0); // find the user in the database
        List<UserInterest> userInterests = userInterestRepository.findByUser(user);
        return userInterests;
    }

    @PutMapping("v1/manipulateinterest")
    public InterestManipulationResponse manipulateInterest (@RequestBody Manipulation manipulation) {
        InterestManipulationResponse response = new InterestManipulationResponse(); // create response object
        response.setType(manipulation.getType());
        response.setResult("failed");
        try {
            List<User> userList = userRepository.findByEmail(manipulation.getInfoPackage().getEmail());// find the user
            if (userList.size()==0) { // no user found
                return response;
            } else { // yes user found
                User user = userList.get(0); // unwrap user
                Long interestID = Long.valueOf(manipulation.getInfoPackage().getInterestID()); // get interestID
                Optional<Interest> findInterest = interestRepository.findById(interestID);
                if (findInterest.isPresent()) { // check if interest id is true
                    Interest interest = findInterest.get(); // unwrap interest
                    List<UserInterest> userInterests = userInterestRepository.findByUserAndInterest(user, interest);
                    if ((manipulation.getType().equals("add")) && (userInterests.size() == 0)) { // add interest
                        UserInterest userInterest = new UserInterest(); // save the entry
                        userInterest.setUser(user);
                        userInterest.setInterest(interest);
                        userInterestRepository.save(userInterest);
                        response.setResult("success");
                    } else if ((manipulation.getType().equals("remove")) && (userInterests.size() > 0)) { // remove interest
                        UserInterest userInterest = userInterests.get(0); // proceed to delete it
                        userInterestRepository.delete(userInterest);
                        response.setResult("success");
                    } else {
                        return response;
                    }
                } else {
                }
                return response;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
        }
        return response;
    }

    @GetMapping ("/v1/getall") // debug
    // get all userInterests
    public List<UserInterest> getAllOfIt () {
        List<UserInterest> userInterests = userInterestRepository.findAll();
        return userInterests;
    }

    @GetMapping ("/v1/getallinterestlist") // debug
    public InterestListResponse getAllInterest () {
        InterestListResponse interestResponse = new InterestListResponse();
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

    @GetMapping("/v1/users") // Debug
    // Get all users at once.
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @PutMapping ("/v1/removeaccount") // debug
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