//Autor: Stefan Rautner
package org.example.server_springboot;

import org.springframework.data.annotation.Id;

public class User {
    @Id
    private String userID;
    private String username;
    private String password;

    //Getter für UserID
    public String getUserID() {
        return userID;
    }

    //Getter & Setter für username

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    //Getter & Setter für password

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
