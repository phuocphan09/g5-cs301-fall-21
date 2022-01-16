package com.ahhp.notifier.utils;

import com.ahhp.notifier.entity.Interest;
import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.entity.UserInterest;
import com.ahhp.notifier.input.PostInput;
import com.ahhp.notifier.repository.InterestRepository;
import com.ahhp.notifier.repository.UserInterestRepository;
import com.ahhp.notifier.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;

@Component
public class Utils {

    @Autowired
    UserInterestRepository userInterestRepository;
    @Autowired
    InterestRepository interestRepository;
    @Autowired
    UserRepository userRepository;

    /**
     * Get a list of all Active or Addable interests for a user.
     * @param user the User object containing their email
     * @param isActive specify whether or not to find Active interests or Addable interests.
     * @return a list of Interest
     */
    public List<Interest> findInterestByUser(User user, boolean isActive) {

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

    /**
     * Find all users who has the specified interest.
     * @param interestName name of the interest
     * @return a list of Users
     * @throws InvalidParameterException
     */
    public List<User> findUserByInterest(String interestName) throws InvalidParameterException {

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

    /**
     * Returns the length of an array.
     * @param arr the array
     * @param <T>
     * @return the length of the array
     */
    public <T> int getLength(T[] arr){
        int count = 0;
        for(T el : arr)
            if (el != null)
                ++count;
        return count;
    }

    /**
     * Convert a string representation of an array into an actual array of Strings
     * @param rep the string representation
     * @return the list of Strings
     */
    public String[] toList(String rep) {
        rep = rep.replace("[", "");
        rep = rep.replace("]", "");
        String[] vals = rep.split (",");
        return vals;
    }

    /**
     * Convert a Post object into a PostInput object.
     * @param post the Post object to be converted
     * @return a PostInput equivalent
     */
    public PostInput toPostInput(Post post) {

        PostInput postInput = new PostInput();

        postInput.setId(post.getId());
        postInput.setInterestList(toList(post.getInterestList()));
        postInput.setPoster(post.getPoster());
        postInput.setDescription(post.getDescription());
        postInput.setTimeStamp(post.getTimeStamp());
        postInput.setTitle(post.getTitle());

        return postInput;
    }

    /**
     * Returns True if the supplied array of Strings contains the specified String.
     * @param array the array to look in
     * @param target the target to look for
     * @return True of the array contains the String
     */
    public boolean arrayContainsString(String[] array, String target) {

        for (String string: array) {

            if (string.equals(target)) {
                return true;
            }
        }
        return false;
    }
}
