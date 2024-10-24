package com.pageturner.spring_boot_library.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "History")
@Data
public class History {

    public History() {}

    public History(String userEmail, String checkoutDate, String returnDate, String title,
                   String author, String description, String img) {

    }

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "userEmail")
    private String userEmail;

    @Column(name = "checkoutDate")
    private String checkoutDate;

    @Column(name = "returnDate")
    private String returnDate;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "description")
    private String description;

    @Column(name = "img")
    private String img;

}
