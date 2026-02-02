package com.blogsite.blog.web;

import com.blogsite.blog.domain.Blog;
import com.blogsite.blog.domain.Category;
import com.blogsite.blog.factory.BlogSummaryResponse;
import com.blogsite.blog.service.BlogService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1.0/blogsite")
public class BlogController {

    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    private Long getUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? Long.parseLong((String) auth.getPrincipal()) : null;
    }

    private String getUserName() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getDetails() instanceof java.util.Map) {
            @SuppressWarnings("unchecked")
            java.util.Map<String, String> details = (java.util.Map<String, String>) auth.getDetails();
            return details.get("userName");
        }
        return null;
    }

    private String getUserRoles() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getAuthorities() == null) return null;
        return auth.getAuthorities().stream()
                .map(authority -> authority.getAuthority().replace("ROLE_", ""))
                .reduce((a, b) -> a + "," + b)
                .orElse(null);
    }

    public record AddBlogRequest(
            @NotBlank @Size(min = 20) String category,
            @NotBlank String article
    ) {}

    public record UpdateBlogRequest(
            String blogName,
            String category,
            String article
    ) {}

    public record CreateCategoryRequest(
            @NotBlank @Size(min = 3) String name
    ) {}

    @PostMapping("/category/create")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CreateCategoryRequest request) {
        Category category = blogService.createCategory(request.name());
        return ResponseEntity.ok(Map.of("id", category.getId(), "name", category.getName()));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(blogService.getAllCategories());
    }

    @PostMapping("/user/blogs/add/{blogname}")
    public ResponseEntity<?> addBlog(
            @PathVariable("blogname") String blogName,
            @Valid @RequestBody AddBlogRequest request
    ) {
        Blog blog = blogService.addBlog(getUserId(), getUserName(), blogName, request.category(), request.article());
        return ResponseEntity.ok(Map.of("id", blog.getId()));
    }

    @GetMapping("/user/getall")
    public ResponseEntity<List<Blog>> getAllForUser() {
        return ResponseEntity.ok(blogService.getBlogsForUser(getUserId()));
    }

    @GetMapping("/blogs/all")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    @GetMapping("/blogs/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable("id") Long id) {
        Blog blog = blogService.getBlogById(id);
        if (blog == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(blog);
    }

    @DeleteMapping("/user/delete/{blogname}")
    public ResponseEntity<?> deleteBlog(@PathVariable("blogname") String blogName) {
        blogService.deleteBlogForUser(getUserId(), blogName, getUserRoles());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/user/blogs/update/{id}")
    public ResponseEntity<Blog> updateBlog(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateBlogRequest request
    ) {
        Blog updated = blogService.updateBlog(getUserId(), id, request.blogName(), request.category(), request.article());
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/blogs/info/{category}")
    public ResponseEntity<List<Blog>> getByCategory(@PathVariable("category") String category) {
        return ResponseEntity.ok(blogService.getByCategory(category));
    }

    @GetMapping("/blogs/get/{category}/{from}/{to}")
    public ResponseEntity<BlogSummaryResponse> getByCategoryAndDuration(
            @PathVariable("category") String category,
            @PathVariable("from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
            @PathVariable("to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return ResponseEntity.ok(blogService.getByCategoryAndDuration(category, from, to));
    }
}
