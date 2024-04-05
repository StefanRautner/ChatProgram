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
    public String checkUser(@RequestParam String username, @RequestParam String password) {
        return chatService.checkUser(username, password);
    }

    @PostMapping("/newUser")
    public String createNewUser(@RequestParam String username, @RequestParam String password) {
        return chatService.createNewUser(username, password);
    }

    @PutMapping("/updateUser")
    public String updateUser(@RequestParam String username, @RequestParam String password) {
        return chatService.updateUser(username, password);
    }

    @PostMapping("/addUserToChat")
    public boolean addUserToChat(@RequestParam String username, @RequestParam String chatID) {
        return chatService.addUserToChat(username, chatID);
    }

    @PostMapping("/removeUserFromChat")
    public boolean removeUserFromChat(@RequestParam String username, @RequestParam String chatID) {
        return chatService.removeUserFromChat(username, chatID);
    }

    /*CHAT*/
    @GetMapping("/getChatNames")
    public String getAllChatNames(@RequestParam String userID) {
        return chatService.getChatNames(userID);
    }

    @PostMapping("/newChat")
    public boolean createNewChat(@RequestParam String chatName) {
        return chatService.createNewChat(chatName);
    }

    @PutMapping("/updateChatName")
    public boolean updateChatname(@RequestParam String chatID, @RequestParam String chatName) {
        return chatService.updateChatName(chatID, chatName);
    }

    @DeleteMapping("/deleteChat")
    public boolean deleteChatById(@RequestParam String chatID) {
        return chatService.deleteChat(chatID);
    }

    /*NACHRICHTEN*/
    @PostMapping("/newMessage")
    public boolean addNewMessage(@RequestParam String userID, @RequestParam String chatID, @RequestParam String message) {
        return chatService.addNewMessage(userID, chatID, message);
    }

    @GetMapping("/getMessages")
    public String getMessages(@RequestParam String chatID) {
        return chatService.getMessagesOfChat(chatID);
    }

    @PutMapping("/updateMessage")
    public boolean updateMessage(@RequestParam String userID, @RequestParam String chatID, @RequestParam String messageID, @RequestParam String message) {
        return chatService.updateMessage(userID, chatID, messageID, message);
    }

    @DeleteMapping("/deleteMessage")
    public boolean deleteMessage(@RequestParam String userID, @RequestParam String chatID, @RequestParam String messageID) {
        return chatService.deleteMessage(userID, chatID, messageID);
    }
}
