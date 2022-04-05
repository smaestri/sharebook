package com.udemy.demo.user;

import javax.validation.constraints.Size;

public class User {

    private String email;
    @Size(min = 2, max = 25, message = "Firstname Entre 2 et 25 caracteres SVP")
    private String firstName;
    @Size(min = 2, max = 25, message = "Lastname Entre 2 et 25 caracteres SVP")
    private String lastName;
    private String password;

    public User(String email) {
        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}