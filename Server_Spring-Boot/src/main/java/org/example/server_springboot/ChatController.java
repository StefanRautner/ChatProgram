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

    @GetMapping
    public List<Chat> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/{id}")
    public Optional<Chat> getChatById(@PathVariable String id) {
        return chatService.getChatById(id);
    }

    @PostMapping
    public Chat createChat(@RequestBody Chat chat) {
        return chatService.createChat(chat);
    }

    @PutMapping("/{id}")
    public Chat updateChat(@PathVariable String id, @RequestBody Chat chat) {
        return chatService.updateChat(id, chat);
    }

    @DeleteMapping("/{id}")
    public void deleteChat(@PathVariable String id) {
        chatService.deleteChat(id);
    }
}
