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

    /**
     * Send a simple email without any formatting, contents specified in the post param.
     * @param post the Post object containing the content of the post
     * @param recipient the email of the recipient
     */
    public void sendSimpleEmail(Post post, String recipient) {

        SimpleMailMessage mail = new SimpleMailMessage(); // create new mail

        mail.setFrom(post.getPoster()); // setFrom
        mail.setTo(recipient); // setTo
        mail.setSubject(post.getTitle()); // setSubject
        mail.setText(post.getDescription()); // setText

        javaMailSender.send(mail); //send email

    }

    /**
     * Send a mime email, with html formatting and everything.
     * @param post the Post object containing the content of the post
     * @param recipient the email of the recipient
     * @param interests the list of interest matching the user and the post
     * @throws MessagingException see documentation
     */
    public void sendMimeMessage(Post post, String recipient, List<String> interests) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom("The Notifier <notifier0000001@gmail.com>");
        mimeMessageHelper.setTo(recipient);
        mimeMessageHelper.setSubject(post.getTitle());
        String formattedText = formatText(post, interests);
        mimeMessageHelper.setText(formattedText, true);

        javaMailSender.send(mimeMessage);
        System.out.println("Mail sent");
    }

    /**
     * Form the header of the email, containing messages about sender and matching interests with the user.
     * @param post the Post object containing the content of the post
     * @param interests the list of interest matching the user and the post
     * @return formarted text
     */
    private String formatText (Post post, List<String> interests) {

        // add email header
        String formatted = "<p>A new post, " + post.getTitle() + " [" + post.getId() + "] from " +
                post.getPoster() + " indicated your interests in : " +
                interests.toString().substring(1,interests.toString().length()-1) + ".</p><p>" +
                post.getDescription() + "</p>";

        // add link to post
        String linkToPost = "http://localhost:3000/viewpost?id=" + post.getId();
        formatted += "<a href='" + linkToPost + "'>" + "Click here to view full post on Notifier" + "</a>";

        // add link to configure interests
        formatted += "<p>No longer want to receive emails about " +
                interests.toString().substring(1,interests.toString().length()-1) + " ?</p>" +
                "<a href='http://localhost:3000/ActiveInterest'> Click here to re-configure your interests.</a>";
        return formatted;
    }

    /**
     * Send the email with contents of the post to every users with matching interest.
     * @param interests list of interests tagged with the post
     * @param post the Post object containing the content of the post
     * @return the number of recipients sent
     */
    public int sendEmail(String[] interests, Post post) {

        int recipientNum = 0;
        Map<String, List<String>> dict = new HashMap<String, List<String>>();

        // construct a list of matching interest for each user
        for (String interest:interests) { // for each interest

            try {
                List<User> users = utils.findUserByInterest(interest); // utils handles all the fuss
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
