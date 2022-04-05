package com.udemy.demo.book;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
public class BookController {

    @GetMapping(value="/books")
    public ResponseEntity list() {
        Book book = new Book();
        book.setTitle("title");
        book.setCategory(new Category("BD"));
        return new ResponseEntity<>(Arrays.asList(book), HttpStatus.OK);
    }

    @PostMapping(value="books")
    public ResponseEntity create(Book book) {
        // TODO
        return new ResponseEntity(book, HttpStatus.CREATED);

    }

    @DeleteMapping(value="books/{bookId}")
    public ResponseEntity deleteBook(@PathVariable("bookId") String bookId) {
        // TODO
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

    @PutMapping(value="books/{bookId}")
    public ResponseEntity updateBook(@PathVariable("bookId") String bookId, Book book) {
        // TODO
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity listCategories() {
        Category category = new Category("BD");
        Category categoryRoman = new Category("Roman");
        return new ResponseEntity<>(Arrays.asList(category, categoryRoman), HttpStatus.OK);
    }

}