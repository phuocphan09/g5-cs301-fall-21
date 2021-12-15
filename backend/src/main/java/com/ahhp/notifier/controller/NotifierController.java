package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.repository.UserRepository;
import com.ahhp.notifier.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotifierController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    // Get all users at once.
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping ("/validateemail/{email}")
     public Response validateEmail(@PathVariable String email) {
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

    @GetMapping ("/validatepassword/{email}")
    public boolean validatePassword(@RequestBody User user, @PathVariable String email) {
        boolean result = false;
        List<User> users = userRepository.findByEmail(email);
        String hashedString = SecurityUtils.hashPassword(user.getPassword());
        if (users.isEmpty()) { // email not registered
            return result;
        } else if (users.get(0).getPassword().equals(hashedString)) { // correct password
            result = true;
            return result;
        } else { return result; }
    }

    @PutMapping ("/createaccount/{email}")
    public boolean createAccount (@RequestBody User newUser, @PathVariable String email) {
        boolean result = false;
        Response validate = validateEmail(email);
        if (!validate.isCreated()) { // account not created
            if ((validate.isValid() && (newUser.getPassword().length()>0))) { // valid email address AND nonempty pw
                String hashedString = SecurityUtils.hashPassword(newUser.getPassword());
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

    @PutMapping ("/removeaccount/{email}")
    public boolean removeAccount (@RequestBody User user, @PathVariable String email) {
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
}
