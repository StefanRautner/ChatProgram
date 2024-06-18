//Autor: Stefan Rautner
package org.example.chatprogrammserver;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

@Service
public class ChatService {
    //Repositories einbinden
    @Autowired
    ChatRepository chatRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    MessageRepository messageRepository;

    /*USER*/
    //UserID aus MongoDB erhalten
    public String checkUser(String username, String password) {
        User user = userRepository.findUserByUsernameAndPassword(username, this.encrypt(password));
        if (user != null) {
            return user.getUserID();
        }
        return null;
    }

    //Neuen User erstellen, falls er noch nicht existiert
    public String createNewUser(String username, String password) {
        User user = userRepository.findUserByUsername(username);

        if (user == null) {
            User newUser = new User();
            newUser.setUsername(username);
            newUser.setPassword(this.encrypt(password));
            userRepository.save(newUser);
            return newUser.getUserID();
        }
        return null;
    }

    //Benutzer updaten, falls er vorhanden ist
    public String updateUser(String username, String password) {
        User user = userRepository.findUserByUsername(username);

        if (user != null) {
            user.setPassword(this.encrypt(password));
            userRepository.save(user);
            return user.getUserID();
        }
        return null;
    }

    //Benutzer löschen, falls er vorhanden ist
    public boolean deleteUser(String username, String password) {
        try {
            User user = userRepository.findUserByUsernameAndPassword(username, this.encrypt(password));
            for(Chat chat : chatRepository.findAllByUserListContaining(user)) {
                if(chat.getUserList().size() == 1) {
                    deleteChat(chat.getChatID());
                }
            }

            userRepository.delete(user);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    //User zu Chat/Gruppe hinzufügen
    public boolean addUserToChat(String username, String chatID) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            List<User> userList = chat.getUserList();
            userList.add(userRepository.findUserByUsername(username));
            chat.setUserList(userList);
            chatRepository.save(chat);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    //User von Chat/Gruppe entfernen
    public boolean removeUserFromChat(String username, String chatID) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            if (chat != null) {
                List<User> userList = chat.getUserList();
                for (User usersInChat : userList) {
                    if (Objects.equals(usersInChat.getUsername(), username)) {
                        userList.remove(usersInChat);
                        break;
                    }
                }
                chat.setUserList(userList);
                chatRepository.save(chat);
                return true;
            }
            return false;
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
                    jsonObject.put("chatName", chat.getChatName());
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
            chatRepository.save(chat);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    //Chat/Gruppe von User löschen
    public boolean deleteChat(String chatID) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            messageRepository.deleteAll(chat.getMessageList());
            chatRepository.delete(chat);
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
            if (chat != null && user != null) {
                List<Message> messageList = chat.getMessageList();
                for (User userInChat : chat.getUserList()) {
                    if (Objects.equals(userInChat.getUserID(), userID)) {
                        Message message = new Message();
                        message.setMessage(messageText);
                        message.setCreatorID(userID);
                        message.setZeitstempel(Instant.now());
                        messageList.add(message);
                        messageRepository.save(message);
                        break;
                    }
                }
                chat.setMessageList(messageList);
                chatRepository.save(chat);
                return true;
            }
            return false;
        } catch (Exception ex) {
            return false;
        }
    }

    //Alle Nachrichten eines Chats von MongoDB erhalten und NachrichtenID & NachrichtenText in JSON-String extrahieren
    public String getMessagesOfChat(String chatID, String userID) {
        Chat chat = chatRepository.findByChatID(chatID);
        if (chat != null) {
            JSONArray jsonArray = new JSONArray();
            for (User userInChat : chat.getUserList()) {
                if (Objects.equals(userInChat.getUserID(), userID)) {
                    for (Message message : chat.getMessageList()) {
                        JSONObject jsonObject = new JSONObject();
                        User creator = userRepository.findByUserID(message.getCreatorID());
                        jsonObject.put("messageID", message.getMessageID());
                        //Zeit der Erstellung (Stunde:Minute) auf Instant extrahieren
                        Instant zeitstempel = message.getZeitstempel();
                        LocalDateTime zeitDerErstellung = LocalDateTime.ofInstant(message.getZeitstempel(), ZoneId.systemDefault());
                        DateTimeFormatter zeitFormatter = DateTimeFormatter.ofPattern("HH:mm");

                        jsonObject.put("message", creator.getUsername() + " (" + zeitDerErstellung.format(zeitFormatter) + "): " + message.getMessage());
                        jsonArray.put(jsonObject);
                    }
                    break;
                }
            }
            return jsonArray.toString();
        }
        return null;
    }

    //NachrichtenText updaten
    public boolean updateMessage(String userID, String chatID, String messageID, String messageText) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            if (chat != null) {
                List<Message> messageList = chat.getMessageList();
                for (Message message : messageList) {
                    Duration zeitSeitErstellung = Duration.between(message.getZeitstempel(), Instant.now());
                    if (Objects.equals(message.getMessageID(), messageID) && Objects.equals(message.getCreatorID(), userID) && 5 > (int) zeitSeitErstellung.toMinutes()) {
                        message.setMessage(messageText);
                        chat.setMessageList(messageList);
                        chatRepository.save(chat);
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return false;
        } catch (Exception ex) {
            return false;
        }
    }

    //Nachricht von Chat/Gruppe löschen
    public boolean deleteMessage(String userID, String chatID, String messageID) {
        try {
            Chat chat = chatRepository.findByChatID(chatID);
            if (chat != null) {
                List<Message> messageList = chat.getMessageList();
                for (Message message : messageList) {
                    if (Objects.equals(message.getMessageID(), messageID) && Objects.equals(message.getCreatorID(), userID)) {
                        messageList.remove(message);
                        chat.setMessageList(messageList);
                        chatRepository.save(chat);
                        break;
                    }
                }
                return true;
            }
            return false;
        } catch (Exception ex) {
            return false;
        }
    }

    //Passwort verschlüsseln
    private static final String ALGORITHM = "AES";
    private static final String MODE = "CBC";
    private static final String PADDING = "PKCS5Padding";
    private static final String KEY = "g9F@3H#kdE7q8nT$S!zG5*bW+mY2p^Vh"; // 128-bit Schlüssel
    private static final String IV = "LDN6mQ/CqnFFOxUP"; // 16-byte Initialisierungs Vektor

    public String encrypt(String plaintext) {
        try {
            Key key = new SecretKeySpec(KEY.getBytes(), ALGORITHM);
            IvParameterSpec iv = new IvParameterSpec(IV.getBytes());
            Cipher cipher = Cipher.getInstance(ALGORITHM + "/" + MODE + "/" + PADDING);
            cipher.init(Cipher.ENCRYPT_MODE, key, iv);
            byte[] encryptedBytes = cipher.doFinal(plaintext.getBytes());
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return null;
    }
}