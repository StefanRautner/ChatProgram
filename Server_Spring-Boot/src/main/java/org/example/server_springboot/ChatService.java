//Autor: Stefan Rautner
package org.example.server_springboot;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Objects;

@Service
public class ChatService {
    //Repositories einbinden
    @Autowired
    ChatRepository chatRepository;
    @Autowired
    UserRepository userRepository;

    /*USER*/
    //UserID aus MongoDB erhalten
    public String checkUser(String username, String password) {
        for (User user : userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username) && Objects.equals(user.getPassword(), password)) {
                return user.getUserID();
            }
        }
        return null;
    }

    //Neuen User erstellen, falls er noch nicht existiert
    public String createNewUser(String username, String password) {
        boolean found = false;
        for (User user : userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username)) {
                found = true;
                break;
            }
        }

        if (!found) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            userRepository.save(user);
            return user.getUserID();
        }
        return null;
    }

    //Benutzer updaten, falls er vorhanden ist
    public String updateUser(String username, String password) {
        for (User user : userRepository.findAll()) {
            if (Objects.equals(user.getUsername(), username)) {
                user.setPassword(password);
                break;
            }
        }
        return null;
    }

    //User zu Chat/Gruppe hinzufügen
    public boolean addUserToChat(String username, String chatID) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            List<User> userList = chat.getUserList();
            userList.add(userRepository.findUserByUsername(username));
            chat.setUserList(userList);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    //User von Chat/Gruppe entfernen
    public boolean removeUserFromChat(String username, String chatID) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            List<User> userList = chat.getUserList();
            userList.remove(userRepository.findUserByUsername(username));
            chat.setUserList(userList);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    /*CHAT*/
    //Alle Chats von MongoDB erhalten und ChatID & chatname in JSON-String extrahieren
    public String getChatNames(String userID) {
        List<Chat> chatList = chatRepository.findAll();
        JSONArray jsonArray = new JSONArray();

        for (Chat chat : chatList) {
            for (User user : chat.getUserList()) {
                if (Objects.equals(user.getUserID(), userID)) {
                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("chatID", chat.getChatID());
                    jsonObject.put("name", chat.getChatName());
                    jsonArray.put(jsonObject);
                }
            }
        }
        return jsonArray.toString();
    }

    //Neuen Chat/Gruppe für User erstellen (und User dazu hinzufügen)
    public boolean createNewChat(String userID, String chatName) {
        try {
            Chat chat = new Chat();
            chat.setChatName(chatName);
            List<User> userList = chat.getUserList();
            userList.add(userRepository.findByUserID(userID));
            chat.setUserList(userList);
            chatRepository.save(chat);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    //Chat/Gruppen-namen ändern
    public boolean updateChatName(String chatID, String chatname) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            chat.setChatName(chatname);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    //Chat/Gruppe von User löschen
    public boolean deleteChat(String chatID) {
        try {
            chatRepository.deleteByChatID(chatID);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    /*NACHRICHTEN*/
    //Neue Nachricht zu Chat hinzufügen
    public boolean addNewMessage(String userID, String chatID, String messageText) {
        try {
            User user = userRepository.findByUserID(userID);
            Chat chat = chatRepository.findByChatID(chatID);
            List<Message> messageList = chat.getMessageList();
            if (chat.getUserList().contains(user)) {
                Message message = new Message();
                message.setMessage(messageText);
                message.setCreatorID(userID);
                message.setZeitstempel(Instant.now());
                messageList.add(message);
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    //Alle Nachrichten eines Chats von MongoDB erhalten und NachrichtenID & NachrichtenText in JSON-String extrahieren
    public String getMessagesOfChat(String chatID, String userID) {
        Chat chat = chatRepository.findByChatID(chatID);
        JSONArray jsonArray = new JSONArray();
        if(chat.getUserList().contains(userRepository.findByUserID(userID))) {
            for (Message message : chat.getMessageList()) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("messageID", message.getMessageID());
                jsonObject.put("messageText", message.getMessage());
                jsonArray.put(jsonObject);
            }
        }
        return jsonArray.toString();
    }

    //NachrichtenText updaten
    public boolean updateMessage(String userID, String chatID, String messageID, String messageText) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            List<Message> messageList = chat.getMessageList();
            for (Message message : messageList) {
                Duration zeitSeitErstellung = Duration.between(message.getZeitstempel(), Instant.now());
                if (Objects.equals(message.getMessageID(), messageID) && Objects.equals(message.getCreatorID(), userID) && 5 <= zeitSeitErstellung.toMinutes()) {
                    message.setMessage(messageText);
                    chat.setMessageList(messageList);
                    break;
                }
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    //Nachricht von Chat/Gruppe löschen
    public boolean deleteMessage(String userID, String chatID, String messageID) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            List<Message> messageList = chat.getMessageList();
            for (Message message : messageList) {
                if (Objects.equals(message.getMessageID(), messageID) && Objects.equals(message.getCreatorID(), userID)) {
                    messageList.remove(message);
                    chat.setMessageList(messageList);
                    break;
                }
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}