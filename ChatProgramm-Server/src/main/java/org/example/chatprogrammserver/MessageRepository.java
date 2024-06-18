//Autor: Stefan Rautner
package org.example.chatprogrammserver;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
