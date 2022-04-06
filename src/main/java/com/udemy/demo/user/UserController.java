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
    public ResponseEntity add(@Valid @RequestBody UserInfo userInfo) {
        UserInfo user = userRepository.findOneByEmail(userInfo.getEmail());
        if(user != null) {
            return new ResponseEntity("User already existing", HttpStatus.BAD_REQUEST);
        }
        UserInfo userSaved = userRepository.save(userInfo);
        return new ResponseEntity(userSaved, HttpStatus.CREATED);
    }

}