package com.blogsite.blog.factory;

import com.blogsite.blog.domain.Blog;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

public class BlogSummaryResponseBuilder {

    private String category;
    private Instant from;
    private Instant to;
    private List<Blog> blogs;

    public BlogSummaryResponseBuilder category(String category) {
        this.category = category;
        return this;
    }

    public BlogSummaryResponseBuilder from(Instant from) {
        this.from = from;
        return this;
    }

    public BlogSummaryResponseBuilder to(Instant to) {
        this.to = to;
        return this;
    }

    public BlogSummaryResponseBuilder blogs(List<Blog> blogs) {
        this.blogs = blogs;
        return this;
    }

    public BlogSummaryResponse build() {
        BlogSummaryResponse response = new BlogSummaryResponse();
        response.setCategory(category);
        response.setFrom(from);
        response.setTo(to);
        response.setTotalCount(blogs == null ? 0 : blogs.size());
        if (blogs != null) {
            response.setBlogs(blogs.stream().map(this::mapToDto).collect(Collectors.toList()));
        }
        return response;
    }

    private BlogSummaryDto mapToDto(Blog blog) {
        BlogSummaryDto dto = new BlogSummaryDto();
        dto.setId(blog.getId());
        dto.setBlogName(blog.getBlogName());
        dto.setCategory(blog.getCategory().getName());
        dto.setAuthorName(blog.getAuthorName());
        dto.setCreatedAt(blog.getCreatedAt());
        String article = blog.getArticle();
        if (article != null && article.length() > 200) {
            dto.setArticleSnippet(article.substring(0, 200) + "...");
        } else {
            dto.setArticleSnippet(article);
        }
        return dto;
    }
}
