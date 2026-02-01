package com.blogsite.blog.repository;

import com.blogsite.blog.domain.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Long> {

    List<Blog> findByAuthorId(Long authorId);

    Optional<Blog> findByAuthorIdAndBlogName(Long authorId, String blogName);

    Optional<Blog> findByBlogName(String blogName);

    void deleteByAuthorIdAndBlogName(Long authorId, String blogName);

    @Query("select b from Blog b join fetch b.category c where c.name = :categoryName")
    List<Blog> findByCategoryName(@Param("categoryName") String categoryName);

    @Query("select b from Blog b join fetch b.category c where c.name = :categoryName and b.createdAt between :from and :to")
    List<Blog> findByCategoryNameAndCreatedAtBetween(
            @Param("categoryName") String categoryName,
            @Param("from") Instant from,
            @Param("to") Instant to
    );
}
