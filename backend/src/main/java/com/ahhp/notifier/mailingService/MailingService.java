package com.ahhp.notifier.mailingService;

import com.ahhp.notifier.entity.Interest;
import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@Service
public class MailingService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendSimpleEmail(Post post, String recipient) {

        SimpleMailMessage mail = new SimpleMailMessage(); // create new mail

        mail.setFrom(post.getPoster()); // setFrom
        mail.setTo(recipient); // setTo
        mail.setSubject(post.getTitle()); // setSubject
        mail.setText(post.getDescription()); // setText

        mailSender.send(mail); //send email

    }

    public void sendMimeMessage(Post post, String recipient, List<String> interests) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

        mimeMessageHelper.setFrom(post.getPoster());
        mimeMessageHelper.setTo(recipient);
        mimeMessageHelper.setSubject(post.getTitle());
        String formattedText = formatText(post, interests);
        mimeMessageHelper.setText(formattedText, true);

        mailSender.send(mimeMessage);
        System.out.println("Mail sent");
    }

    private String formatText (Post post, List<String> interests) {

        String formatted = "<p>A new post " + post.getTitle() + ":" + post.getId() + " from " +
                post.getPoster() + " indicated your interests in : " +
                interests.toString().substring(1,interests.toString().length()-1) + ".</p><p>" +
                post.getDescription() + "</p>";

        return formatted;
    }

}
