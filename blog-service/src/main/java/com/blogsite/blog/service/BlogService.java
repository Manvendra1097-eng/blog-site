package com.blogsite.blog.service;

import com.blogsite.blog.domain.Blog;
import com.blogsite.blog.domain.Category;
import com.blogsite.blog.factory.BlogSummaryResponse;
import com.blogsite.blog.factory.BlogSummaryResponseBuilder;
import com.blogsite.blog.repository.BlogRepository;
import com.blogsite.blog.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
public class BlogService {

    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;

    public BlogService(BlogRepository blogRepository, CategoryRepository categoryRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public Blog addBlog(Long authorId, String authorName, String blogName, String categoryName, String article) {
        if (blogName == null || blogName.length() < 20) {
            throw new IllegalArgumentException("Blog name must be at least 20 characters");
        }
        if (categoryName == null || categoryName.length() < 20) {
            throw new IllegalArgumentException("Category must be at least 20 characters");
        }
        if (article == null || article.trim().split("\\s+").length < 1000) {
            throw new IllegalArgumentException("Article must be at least 1000 words");
        }
        Category category = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        Blog blog = new Blog();
        blog.setAuthorId(authorId);
        blog.setAuthorName(authorName);
        blog.setBlogName(blogName);
        blog.setCategory(category);
        blog.setArticle(article);
        return blogRepository.save(blog);
    }

    public List<Blog> getBlogsForUser(Long authorId) {
        return blogRepository.findByAuthorId(authorId);
    }

    @Transactional
    public void deleteBlogForUser(Long authorId, String blogName, String roles) {
        boolean isAdmin = roles != null && roles.contains("ADMIN");

        if (isAdmin) {
            // Admin can delete any blog by name
            Blog blog = blogRepository.findByBlogName(blogName)
                    .orElseThrow(() -> new IllegalArgumentException("Blog not found"));
            blogRepository.delete(blog);
        } else {
            // Regular user can only delete their own blog
            Blog blog = blogRepository.findByAuthorIdAndBlogName(authorId, blogName)
                    .orElseThrow(() -> new IllegalArgumentException("Blog not found for user"));
            blogRepository.delete(blog);
        }
    }

    @Transactional
    public Blog updateBlog(Long authorId, Long blogId, String blogName, String categoryName, String article) {
        Blog blog = blogRepository.findById(blogId)
                .orElseThrow(() -> new IllegalArgumentException("Blog not found"));

        if (!blog.getAuthorId().equals(authorId)) {
            throw new IllegalArgumentException("User cannot update this blog");
        }

        if (blogName != null && !blogName.trim().isEmpty()) {
            if (blogName.length() < 20) {
                throw new IllegalArgumentException("Blog name must be at least 20 characters");
            }
            blog.setBlogName(blogName);
        }

        if (categoryName != null && !categoryName.trim().isEmpty()) {
            Category category = categoryRepository.findByName(categoryName)
                    .orElseThrow(() -> new IllegalArgumentException("Category not found: " + categoryName));
            blog.setCategory(category);
        }

        if (article != null && !article.trim().isEmpty()) {
            blog.setArticle(article);
        }

        return blogRepository.save(blog);
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public List<Blog> getByCategory(String categoryName) {
        return blogRepository.findByCategoryName(categoryName);
    }

    public BlogSummaryResponse getByCategoryAndDuration(String categoryName, LocalDate from, LocalDate to) {
        Instant fromInstant = from.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant toInstant = to.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant().minusSeconds(1);
        List<Blog> blogs = blogRepository.findByCategoryNameAndCreatedAtBetween(categoryName, fromInstant, toInstant);
        return new BlogSummaryResponseBuilder()
                .category(categoryName)
                .from(fromInstant)
                .to(toInstant)
                .blogs(blogs)
                .build();
    }

    @Transactional
    public Category createCategory(String name) {
        if (name == null || name.length() < 3) {
            throw new IllegalArgumentException("Category name must be at least 3 characters");
        }

        // Check if category already exists
        if (categoryRepository.findByName(name).isPresent()) {
            throw new IllegalArgumentException("Category already exists");
        }

        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }
}
