package org.example.server_springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tinyWhatsApp/api")
public class ChatController {
    @Autowired
    private ChatService chatService;

    /*USER*/
    @GetMapping("/checkUser")
    public String checkUser(@RequestBody String username, @RequestBody String password) {
        return chatService.checkUser(username, password);
    }

    @PostMapping("/newUser")
    public String createNewUser(@RequestBody String username, @RequestBody String password) {
        return chatService.createNewUser(username, password);
    }

    @PutMapping("/updateUser")
    public String updateUser(@RequestBody String username, @RequestBody String password) {
        return chatService.updateUser(username, password);
    }

    /*CHAT*/
    @GetMapping("/getChats")
    public List<Chat> getAllChatNames(@RequestBody String userID) {
        return chatService.getChatNames(userID);
    }

    @PostMapping("/newChat")
    public boolean createNewChat(@RequestBody String userID, @RequestBody String chatName) {
        return chatService.createNewChat(userID, chatName);
    }

    @DeleteMapping("/deleteChat")
    public boolean deleteChatById(@RequestBody String userID, @RequestBody String chatID) {
        return chatService.deleteChat(userID, chatID);
    }

    /*NACHRICHTEN*/
    @PostMapping("/newMessage")
    public boolean addNewMessage(@RequestBody String userID, @RequestBody String chatID, @RequestBody String message) {
        return chatService.addNewMessage(userID, chatID, message);
    }

    @GetMapping("/getMessages")
    public List<Chat> getMessages(@RequestBody String userID, @RequestBody String chatID) {
        return chatService.getMessagesOfChat(userID, chatID);
    }

    @PutMapping("/updateMessage")
    public boolean updateMessage(@RequestBody String userID, @RequestBody String chatID, @RequestBody String messageID, @RequestBody  String message) {
        return chatService.updateMessage(userID, chatID, messageID, message);
    }

    @DeleteMapping("/deleteMessage")
    public boolean deleteMessage(@RequestBody String userID, @RequestBody String chatID, @RequestBody String messageID) {
        return chatService.deleteMessage(userID, chatID, messageID);
    }
}
