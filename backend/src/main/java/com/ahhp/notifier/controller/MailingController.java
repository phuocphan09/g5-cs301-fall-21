package com.ahhp.notifier.controller;

import com.ahhp.notifier.entity.Post;
import com.ahhp.notifier.mailingService.MailingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MailingController {

    @Autowired
    private MailingService service;

    @PostMapping("/v1/sendemail")
    public String testPlainTextMail(@RequestBody Post post, @RequestParam String recipient) {
        service.sendSimpleEmail(post,recipient);
        String result = "sent successfully";
        return result;
    }

}
