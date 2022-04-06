package com.udemy.demo.book;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {

    List<Book> findByStatusAndUserIdNotAndDeletedFalse(BookStatus status, Integer userId);
    List<Book> findByUserIdAndDeletedFalse(Integer userId);

}