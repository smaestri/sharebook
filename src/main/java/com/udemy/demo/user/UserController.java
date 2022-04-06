package com.udemy.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/users")
    public ResponseEntity add(@Valid @RequestBody  User user) {
        List<User> users = userRepository.findByEmail(user.getEmail());
        if(!users.isEmpty()) {
            return new ResponseEntity("User already existing", HttpStatus.BAD_REQUEST);
        }
        userRepository.save(user);
        return new ResponseEntity(user, HttpStatus.CREATED);
    }

}