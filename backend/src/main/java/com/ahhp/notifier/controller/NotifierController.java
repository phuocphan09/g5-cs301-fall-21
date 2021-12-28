package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.repository.UserRepository;
import com.ahhp.notifier.response.AccountValidationResponse;
import com.ahhp.notifier.response.EmailValidationResponse;
import com.ahhp.notifier.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class NotifierController {

    @Autowired
    private UserRepository userRepository;

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
