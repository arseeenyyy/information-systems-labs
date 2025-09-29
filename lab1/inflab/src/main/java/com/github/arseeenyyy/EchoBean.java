package com.github.arseeenyyy;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import java.io.Serializable;

@Named("echoBean")
@SessionScoped
public class EchoBean implements Serializable {
    
    private String inputMessage;
    private String outputMessage;
    
    @Inject
    private EchoService echoService;
    
    public void processForm() {
        outputMessage = echoService.processMessage(inputMessage);
    }
    
    public String getInputMessage() {
        return inputMessage;
    }
    
    public void setInputMessage(String inputMessage) {
        this.inputMessage = inputMessage;
    }
    
    public String getOutputMessage() {
        return outputMessage;
    }
}