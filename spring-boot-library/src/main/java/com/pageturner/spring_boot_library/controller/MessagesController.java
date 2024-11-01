package com.pageturner.spring_boot_library.controller;

import com.pageturner.spring_boot_library.entity.Message;
import com.pageturner.spring_boot_library.requestmodels.AdminQuestionRequest;
import com.pageturner.spring_boot_library.service.MessageService;
import com.pageturner.spring_boot_library.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    private MessageService messageService;

    public MessagesController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void addMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody Message messageRequest) {
        String useEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messageService.postMessage(messageRequest, useEmail);

    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        String useEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        messageService.putMessage(adminQuestionRequest, useEmail);
    }

}
