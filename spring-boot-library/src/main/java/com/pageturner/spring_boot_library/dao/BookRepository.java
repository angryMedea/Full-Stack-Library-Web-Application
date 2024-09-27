package com.pageturner.spring_boot_library.dao;

import com.pageturner.spring_boot_library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Spring Data REST will automatically generate RESTful APIs based on JpaRepository
 * Automatic generation of CRUD operations as REST APIs
 * e.g. automatic creation of RESTful search endpoints(like /search) for custom query methods
 */
public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);

}
