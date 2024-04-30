//Autor: Stefan Rautner
package org.example.server_springboot;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
