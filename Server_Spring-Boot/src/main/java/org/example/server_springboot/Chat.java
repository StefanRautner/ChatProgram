package org.example.server_springboot;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "chats")
public class Chat {
    @Id
    private String id;
    private String nachricht;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }
}
