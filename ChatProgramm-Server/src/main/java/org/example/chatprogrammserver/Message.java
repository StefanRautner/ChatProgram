//Autor: Stefan Rautner
package org.example.chatprogrammserver;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;


@Document(collection = "messages")
public class Message {
    @Id
    private String messageID;
    private String creatorID;
    private String message;
    private Instant zeitstempel;

    //Getter für NachrichtenID
    public String getMessageID() {
        return messageID;
    }

    //Setter & Getter für creatorID
    public String getCreatorID() {
        return creatorID;
    }

    public void setCreatorID(String creatorID) {
        this.creatorID = creatorID;
    }

    //Setter & Getter für Nachrichtentext
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    //Setter & Getter für Zeitstempel
    public Instant getZeitstempel() {
        return zeitstempel;
    }

    public void setZeitstempel(Instant zeitstempel) {
        this.zeitstempel = zeitstempel;
    }
}
