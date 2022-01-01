package com.ahhp.notifier.mailingService;

import com.ahhp.notifier.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

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
}
