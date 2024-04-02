package org.example.server_springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {
    @Autowired
    private ChatRepository chatRepository;

    public List<ChatModel> getAllChats() {
        return chatRepository.findAll();
    }

    public Optional<ChatModel> getChatById(String id) {
        return chatRepository.findById(id);
    }

    public ChatModel createChat(ChatModel chat) {
        return chatRepository.save(chat);
    }

    public void deleteChat(String id) {
        chatRepository.deleteById(id);
    }

    public ChatModel updateChat(String id, ChatModel newChat) {
        newChat.setId(id);
        return chatRepository.save(newChat);
    }
}
