package com.pageturner.spring_boot_library.dao;

import com.pageturner.spring_boot_library.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Spring Data REST will automatically generate RESTful APIs based on JpaRepository
 * Automatic generation of CRUD operations as REST APIs
 * e.g. automatic creation of RESTful search endpoints(like /search) for custom query methods
 */
public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);

    // This is a JPQL sentence not a SQL sentence
    // JPQL is object-oriented not table-oriented
    // JPA will translate the JPQL into SQL then
    @Query("select o from Book o where o.id in :books_ids")
    List<Book> findBooksByBookIds(@Param("books_ids") List<Long> bookId);

}
