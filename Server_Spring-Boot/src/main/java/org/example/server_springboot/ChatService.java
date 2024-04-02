package org.example.server_springboot;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ChatService {
    /*USER*/
    public String checkUser(String username, String password) {
        //DO SOMETHING AND RETURN USERID
    }

    public String createNewUser(String username, String password) {
        //DO SOMETHING AND RETURN USERID
    }

    public String updateUser(String username, String password) {
        //DO SOMETHING AND RETURN USERID
    }

    /*CHAT*/
    public List<Chat> getChatNames(String userID) {
        //DO SOMETHING AND RETURN LIST OF CHATNAMES
    }

    public boolean createNewChat(String userID, String chatName) {
        //DO SOMETHING AND RETURN BOOLEAN (IF SUCCESSFULLY)
    }

    public boolean deleteChat(String userID, String chatID) {
        //DO SOMETHING AND RETURN BOOLEAN (IF SUCCESSFULLY)
    }

    /*NACHRICHTEN*/
    public boolean addNewMessage(String userID, String chatID, String message) {
        //DO SOMETHING AND RETURN BOOLEAN (IF SUCCESSFULLY)
    }

    public List<Chat> getMessagesOfChat(String userID, String chatID) {
        //DO SOMETHING AND RETURN LIST OF MESSAGES IN CHAT
    }

    public boolean updateMessage(String userID, String chatID, String messageID, String message) {
        //DO SOMETHING AND RETURN BOOLEAN (IF SUCCESSFULLY)
    }

    public boolean deleteMessage(String userID, String chatID, String messageID) {
        //DO SOMETHING AND RETURN BOOLEAN (IF SUCCESSFULLY)
    }
}
