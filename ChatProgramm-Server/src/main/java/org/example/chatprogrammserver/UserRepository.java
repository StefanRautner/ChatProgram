//Autor: Stefan Rautner
package org.example.chatprogrammserver;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    User findByUserID(String userID);

    User findUserByUsername(String username);

    User findUserByUsernameAndPassword(String username, String password);
}
