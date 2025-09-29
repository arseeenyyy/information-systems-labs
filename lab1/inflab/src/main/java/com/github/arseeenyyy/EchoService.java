package com.github.arseeenyyy;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class EchoService {
    
    public String processMessage(String message) {
        if (message == null || message.trim().isEmpty()) {
            return "Сообщение не может быть пустым!";
        }
        return "ECHO: " + message.toUpperCase();
    }
}