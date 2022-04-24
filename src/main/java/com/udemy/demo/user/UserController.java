package com.udemy.demo.user;

import com.udemy.demo.configuration.MyUserDetailService;
import com.udemy.demo.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/users")
    public ResponseEntity add(@Valid @RequestBody UserInfo user, HttpServletResponse response) {

        List<UserInfo> users = userRepository.findByEmail(user.getEmail());
        if(!users.isEmpty()) {
            return new ResponseEntity("User already existing", HttpStatus.BAD_REQUEST);
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setLastName(StringUtils.capitalize(user.getLastName()));
        user.setFirstName(StringUtils.capitalize(user.getFirstName()));
        userRepository.save(user);
        String token = jwtUtils.generateToken(new MyUserDetailService.UserPrincipal(user));
        Cookie cookie = new Cookie("token", token);
        response.addCookie(cookie);
        return new ResponseEntity(user, HttpStatus.CREATED);
    }

    @GetMapping(value = "/isConnected")
    public ResponseEntity getUSerConnected() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            return new ResponseEntity(((UserDetails) principal).getUsername(), HttpStatus.OK);
        }
        return new ResponseEntity("User is not connected", HttpStatus.FORBIDDEN);
    }

}