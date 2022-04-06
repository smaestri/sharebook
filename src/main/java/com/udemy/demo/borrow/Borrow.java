package com.udemy.demo.borrow;

import com.udemy.demo.book.Book;
import com.udemy.demo.user.UserInfo;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Borrow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    private UserInfo borrower;

    @ManyToOne
    private UserInfo lender;

    @ManyToOne
    private Book book;

    private LocalDate askDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getAskDate() {
        return askDate;
    }

    public void setAskDate(LocalDate askDate) {
        this.askDate = askDate;
    }

    public LocalDate getCloseDate() {
        return closeDate;
    }

    public void setCloseDate(LocalDate closeDate) {
        this.closeDate = closeDate;
    }

    private LocalDate closeDate;


    public UserInfo getBorrower() {
        return borrower;
    }

    public void setBorrower(UserInfo borrower) {
        this.borrower = borrower;
    }

    public UserInfo getLender() {
        return lender;
    }

    public void setLender(UserInfo lender) {
        this.lender = lender;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }


}