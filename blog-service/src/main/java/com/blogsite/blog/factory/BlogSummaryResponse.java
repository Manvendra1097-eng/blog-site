package com.blogsite.blog.factory;

import java.time.Instant;
import java.util.List;

public class BlogSummaryResponse {

    private String category;
    private Instant from;
    private Instant to;
    private long totalCount;
    private List<BlogSummaryDto> blogs;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Instant getFrom() {
        return from;
    }

    public void setFrom(Instant from) {
        this.from = from;
    }

    public Instant getTo() {
        return to;
    }

    public void setTo(Instant to) {
        this.to = to;
    }

    public long getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }

    public List<BlogSummaryDto> getBlogs() {
        return blogs;
    }

    public void setBlogs(List<BlogSummaryDto> blogs) {
        this.blogs = blogs;
    }
}
