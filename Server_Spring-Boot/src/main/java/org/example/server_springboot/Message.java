package org.example.server_springboot;

import org.springframework.data.annotation.Id;

public class Message {
    @Id
    private String messageID;
    private String message;

    //Getter für NachrichtenID

    public String getMessageID() {
        return messageID;
    }

    //Setter & Getter für Nachrichtentext
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
