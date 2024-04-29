//Autor: Stefan Rautner
package org.example.server_springboot;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "chats")
public class Chat {
    @Id
    private String chatID;
    private List<User> userList = new ArrayList<>();
    private List<Message> messageList = new ArrayList<>();
    private String chatName;

    //Getter & Setter for UserList
    public void setUserList(List<User> userList) {
        this.userList = userList;
    }

    public List<User> getUserList() {
        return this.userList;
    }

    //Getter for ChatID

    public String getChatID() {
        return this.chatID;
    }

    //Getter & Setter for Chatname
    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public java.lang.String getChatName() {
        return chatName;
    }

    //Getter & Setter for MessageList
    public void setMessageList(List<Message> messageList) {
        this.messageList = messageList;
    }

    public List<Message> getMessageList() {
        return this.messageList;
    }
}
