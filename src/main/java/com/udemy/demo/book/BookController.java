package com.udemy.demo.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping(value = "/books")
    public ResponseEntity list(@RequestParam(required = false) BookStatus status) {
        Integer userConnectedId = this.getUserConnectedId();
        List<Book> books;
        if (status != null && status == BookStatus.FREE) {
            books = bookRepository.findByStatusAndUserIdNotAndDeletedFalse(status, userConnectedId);
        } else {
            books = bookRepository.findByUserIdAndDeletedFalse(userConnectedId);
        }
        return new ResponseEntity(books, HttpStatus.OK);
    }

    private Integer getUserConnectedId() {
        return 1;
    }

    @PostMapping(value = "books")
    public ResponseEntity create(@Valid @RequestBody Book book) {
        // TODO
        return new ResponseEntity(book, HttpStatus.CREATED);

    }

    @DeleteMapping(value = "books/{bookId}")
    public ResponseEntity deleteBook(@PathVariable("bookId") String bookId) {
        // TODO
        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }

    @PutMapping(value = "books/{bookId}")
    public ResponseEntity updateBook(@PathVariable("bookId") String bookId, @RequestBody Book book) {
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