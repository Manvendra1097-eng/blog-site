package com.blogsite.blog.factory;

import java.time.Instant;

public class BlogSummaryDto {

    private Long id;
    private String blogName;
    private String category;
    private String authorName;
    private Instant createdAt;
    private String articleSnippet;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBlogName() {
        return blogName;
    }

    public void setBlogName(String blogName) {
        this.blogName = blogName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getArticleSnippet() {
        return articleSnippet;
    }

    public void setArticleSnippet(String articleSnippet) {
        this.articleSnippet = articleSnippet;
    }
}
