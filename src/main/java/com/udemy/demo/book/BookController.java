package com.udemy.demo.book;

import com.udemy.demo.borrow.Borrow;
import com.udemy.demo.borrow.BorrowRepository;
import com.udemy.demo.user.User;
import com.udemy.demo.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BorrowRepository borrowRepository;

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

    @PostMapping(value = "/books")
    public ResponseEntity create(@RequestBody @Valid Book book) {
        Integer userConnectedId = this.getUserConnectedId();
        Optional<User> user = userRepository.findById(userConnectedId);
        Optional<Category> category = categoryRepository.findById(book.getCategoryId());
        if (category.isPresent()) {
            book.setCategory(category.get());
        } else {
            return new ResponseEntity("You must provide a valid category", HttpStatus.BAD_REQUEST);
        }
        if (user.isPresent()) {
            book.setUser(user.get());
        } else {
            return new ResponseEntity("You must provide a valid user", HttpStatus.BAD_REQUEST);
        }
        book.setDeleted(false);
        book.setStatus(BookStatus.FREE);
        bookRepository.save(book);
        return new ResponseEntity(book, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/books/{bookId}")
    public ResponseEntity deleteBook(@PathVariable("bookId") String bookId) {
        Optional<Book> bookToDelete = bookRepository.findById(Integer.valueOf(bookId));

        if (!bookToDelete.isPresent()) {
            return new ResponseEntity("Book not found", HttpStatus.BAD_REQUEST);
        }

        Book updatedBook = bookToDelete.get();
        List<Borrow> borrows = borrowRepository.findByBookId(updatedBook.getId());

        for (Borrow borrow : borrows) {
            if (borrow.getCloseDate() == null) {
                User borrower = borrow.getBorrower();
                return new ResponseEntity(borrower, HttpStatus.CONFLICT);
            }

        }
        updatedBook.setDeleted(true);
        bookRepository.save(updatedBook);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


    @PutMapping(value = "/books/{bookId}")
    public ResponseEntity updateBook(@PathVariable("bookId") String bookId, @Valid @RequestBody Book book) {
        Optional<Book> bookToUpdate = bookRepository.findById(Integer.valueOf(bookId));
        if (!bookToUpdate.isPresent()) {
            return new ResponseEntity("Book not existing", HttpStatus.BAD_REQUEST);
        }
        Book bookToSave = bookToUpdate.get();
        Optional<Category> newCategory = categoryRepository.findById(book.getCategoryId());
        bookToSave.setCategory(newCategory.get());
        bookToSave.setTitle(book.getTitle());
        bookRepository.save(bookToSave);

        return new ResponseEntity(bookToSave, HttpStatus.OK);
    }

    @GetMapping("/categories")
    public ResponseEntity listCategories() {
        Category category = new Category("BD");
        Category categoryRoman = new Category("Roman");

        return new ResponseEntity<>(Arrays.asList(category, categoryRoman), HttpStatus.OK);
    }

    @GetMapping("/books/{bookId}")
    public ResponseEntity loadBook(@PathVariable("bookId") String bookId) {
        Optional<Book> book = bookRepository.findById(Integer.valueOf(bookId));
        if(!book.isPresent()){
            return new ResponseEntity("Book not found", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(book.get(), HttpStatus.OK);
    }
}