package com.udemy.demo.jwt;

public class JwtResponse {

    private int userId;
    private String userName;
    public JwtResponse(int id, String username) {
        this.userId = id;
        this.userName = username;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}