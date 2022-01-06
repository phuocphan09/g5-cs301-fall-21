package com.ahhp.notifier.service;

import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.entity.User;
import com.ahhp.notifier.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailSender {

    @Value("${spring.mail.username}")
    private String username;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    Utils utils;

    public void sendSimpleEmail(Post post, String recipient) {

        SimpleMailMessage mail = new SimpleMailMessage(); // create new mail

        mail.setFrom(post.getPoster()); // setFrom
        mail.setTo(recipient); // setTo
        mail.setSubject(post.getTitle()); // setSubject
        mail.setText(post.getDescription()); // setText

        javaMailSender.send(mail); //send email

    }

    public void sendMimeMessage(Post post, String recipient, List<String> interests) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom(username);
        mimeMessageHelper.setTo(recipient);
        mimeMessageHelper.setSubject(post.getTitle());
        String formattedText = formatText(post, interests);
        mimeMessageHelper.setText(formattedText, true);

        javaMailSender.send(mimeMessage);
        System.out.println("Mail sent");
    }

    private String formatText (Post post, List<String> interests) {

        // add email header
        String formatted = "<p>A new post, " + post.getTitle() + " [" + post.getId() + "] from " +
                post.getPoster() + " indicated your interests in : " +
                interests.toString().substring(1,interests.toString().length()-1) + ".</p><p>" +
                post.getDescription() + "</p>";

        // add link to post
        String linkToPost = "localhost:3000/viewpost?postid=" + post.getId();
        formatted += "<a href='" + linkToPost + "'>" + "Link to post" + "</a>";

        return formatted;
    }

    public int sendEmail(String[] interests, Post post) {

        int recipientNum = 0;
        Map<String, List<String>> dict = new HashMap<String, List<String>>();

        for (String interest:interests) {

            try {
                List<User> users = utils.findUserByInterest(interest);
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
                sendMimeMessage(post, recipient, dict.get(recipient));
            } catch (Exception e) {
                System.out.println(e.toString());
            }
        }
        return recipientNum;

    }
}
