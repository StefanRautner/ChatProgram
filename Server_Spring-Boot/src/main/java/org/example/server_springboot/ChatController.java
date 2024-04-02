package org.example.server_springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chats")
public class ChatController {
    @Autowired
    private ChatService chatService;

    @GetMapping("/getAllChats")
    public List<ChatModel> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/getChatByID/{id}")
    public Optional<ChatModel> getChatById(@PathVariable String id) {
        return chatService.getChatById(id);
    }

    @PostMapping("/CreateNewChat")
    public ChatModel createChat(@RequestBody ChatModel chat) {
        return chatService.createChat(chat);
    }

    @PutMapping("/UpdateChatByID/{id}")
    public ChatModel updateChat(@PathVariable String id, @RequestBody ChatModel chat) {
        return chatService.updateChat(id, chat);
    }

    @DeleteMapping("/deleteChatByID/{id}")
    public void deleteChat(@PathVariable String id) {
        chatService.deleteChat(id);
    }
}
