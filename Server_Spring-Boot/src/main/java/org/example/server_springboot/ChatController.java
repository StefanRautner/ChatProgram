//Autor: Stefan Rautner
package org.example.server_springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tinyWhatsApp")
public class ChatController {
    //Service einbinden
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

    @PostMapping("/addUserToChat")
    public boolean addUserToChat(@RequestBody String username, @RequestBody String chatID) {
        return chatService.addUserToChat(username, chatID);
    }

    /*CHAT*/
    @GetMapping("/getChatNames")
    public String getAllChatNames(@RequestBody String userID) {
        return chatService.getChatNames(userID);
    }

    @PostMapping("/newChat")
    public boolean createNewChat(@RequestBody String chatName) {
        return chatService.createNewChat(chatName);
    }

    @PutMapping("/updateChatName")
    public boolean updateChatname(@RequestBody String chatID, @RequestBody String chatName) {
        return chatService.updateChatName(chatID, chatName);
    }

    @DeleteMapping("/deleteChat")
    public boolean deleteChatById(@RequestBody String chatID) {
        return chatService.deleteChat(chatID);
    }

    /*NACHRICHTEN*/
    @PostMapping("/newMessage")
    public boolean addNewMessage(@RequestBody String userID, @RequestBody String chatID, @RequestBody String message) {
        return chatService.addNewMessage(userID, chatID, message);
    }

    @GetMapping("/getMessages")
    public String getMessages(@RequestBody String chatID) {
        return chatService.getMessagesOfChat(chatID);
    }

    @PutMapping("/updateMessage")
    public boolean updateMessage(@RequestBody String userID, @RequestBody String chatID, @RequestBody String messageID, @RequestBody String message) {
        return chatService.updateMessage(userID, chatID, messageID, message);
    }

    @DeleteMapping("/deleteMessage")
    public boolean deleteMessage(@RequestBody String userID, @RequestBody String chatID, @RequestBody String messageID) {
        return chatService.deleteMessage(userID, chatID, messageID);
    }
}
