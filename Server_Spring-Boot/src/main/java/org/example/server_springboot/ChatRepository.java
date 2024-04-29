//Autor: Stefan Rautner
package org.example.server_springboot;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Chat, String> {
    void deleteByChatID(String chatID);

    Chat findByChatID(String chatID);
}
