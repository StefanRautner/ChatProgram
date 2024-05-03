//Autor: Stefan Rautner
package org.example.server_springboot;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

//CrossOrigin für die PWA (Progressiv WebApp) erlauben
@CrossOrigin(origins = {"http://localhost:63343", "http://localhost:63342"})
@RestController
@RequestMapping("/tinyWhatsApp")
public class ChatController {
    //Service einbinden
    @Autowired
    private ChatService chatService;

    /*USER*/
    @PostMapping("/checkUser")
    public String checkUser(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.checkUser(jsonBody.getString("username"), jsonBody.getString("password"));
    }

    @PostMapping("/newUser")
    public String createNewUser(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.createNewUser(jsonBody.getString("username"), jsonBody.getString("password"));
    }

    @PutMapping("/updateUser")
    public String updateUser(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.updateUser(jsonBody.getString("username"), jsonBody.getString("password"));
    }

    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.deleteUser(jsonBody.getString("username"), jsonBody.getString("password"));
    }

    /*USER & CHAT*/
    @PostMapping("/addUserToChat")
    public boolean addUserToChat(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.addUserToChat(jsonBody.getString("username"), jsonBody.getString("chatID"));
    }

    @PostMapping("/removeUserFromChat")
    public boolean removeUserFromChat(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.removeUserFromChat(jsonBody.getString("username"), jsonBody.getString("chatID"));
    }

    /*CHAT*/
    @PostMapping("/getChatNames")
    public String getAllChatNames(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.getChatNames(jsonBody.getString("userID"));
    }

    @PostMapping("/newChat")
    public boolean createNewChat(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.createNewChat(jsonBody.getString("userID"), jsonBody.getString("chatName"));
    }

    @PutMapping("/updateChatName")
    public boolean updateChatname(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.updateChatName(jsonBody.getString("chatID"), jsonBody.getString("chatName"));
    }

    @DeleteMapping("/deleteChat")
    public boolean deleteChatById(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.deleteChat(jsonBody.getString("chatID"));
    }

    /*NACHRICHTEN*/
    @PostMapping("/newMessage")
    public boolean addNewMessage(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.addNewMessage(jsonBody.getString("userID"), jsonBody.getString("chatID"), jsonBody.getString("message"));
    }

    @PostMapping("/getMessages")
    public String getMessages(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.getMessagesOfChat(jsonBody.getString("chatID"), jsonBody.getString("userID"));
    }

    @PutMapping("/updateMessage")
    public boolean updateMessage(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.updateMessage(jsonBody.getString("userID"), jsonBody.getString("chatID"), jsonBody.getString("messageID"), jsonBody.getString("message"));
    }

    @DeleteMapping("/deleteMessage")
    public boolean deleteMessage(@RequestBody String body) {
        JSONObject jsonBody = new JSONObject(body);
        return chatService.deleteMessage(jsonBody.getString("userID"), jsonBody.getString("chatID"), jsonBody.getString("messageID"));
    }
}
