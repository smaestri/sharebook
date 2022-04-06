package com.udemy.demo.user;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<UserInfo, Integer> {

    List<UserInfo> findByEmail(String email);

}