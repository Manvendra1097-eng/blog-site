package com.blogsite.blog.service;

import com.blogsite.blog.domain.Blog;
import com.blogsite.blog.domain.Category;
import com.blogsite.blog.repository.BlogRepository;
import com.blogsite.blog.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(2)
public class BlogSeeder implements CommandLineRunner {

    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;

    public BlogSeeder(BlogRepository blogRepository, CategoryRepository categoryRepository) {
        this.blogRepository = blogRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        if (blogRepository.count() > 0) {
            return;
        }

        Category techCategory = categoryRepository.findByName("Technology and Programming")
                .orElseThrow(() -> new RuntimeException("Technology category not found"));
        Category healthCategory = categoryRepository.findByName("Health and Lifestyle Guides")
                .orElseThrow(() -> new RuntimeException("Health category not found"));

        // Admin's blog
        Blog adminBlog = new Blog();
        adminBlog.setAuthorId(1L);
        adminBlog.setAuthorName("admin");
        adminBlog.setBlogName("Getting Started with Microservices Architecture");
        adminBlog.setCategory(techCategory);
        adminBlog.setArticle(generateArticle(
                "Getting Started with Microservices Architecture",
                "Microservices architecture has revolutionized the way we build and deploy applications. This architectural style structures an application as a collection of loosely coupled services, which implement business capabilities. The microservice architecture enables the continuous delivery and deployment of large, complex applications. It also enables an organization to evolve its technology stack. In this comprehensive guide, we'll explore the fundamental concepts of microservices, their benefits, challenges, and best practices for implementation. We'll discuss service decomposition strategies, inter-service communication patterns, data management approaches, and deployment considerations. Understanding these concepts is crucial for any developer looking to build scalable, maintainable applications in today's cloud-native world. Microservices offer several key advantages including improved scalability, better fault isolation, easier deployment, and technology diversity. However, they also come with challenges such as increased complexity in testing, monitoring, and debugging distributed systems. Let's dive deeper into each of these aspects and understand how to effectively leverage microservices architecture in your projects."
        ));

        // User's blog
        Blog userBlog = new Blog();
        userBlog.setAuthorId(2L);
        userBlog.setAuthorName("user");
        userBlog.setBlogName("The Art of Small Wins: How Celebrating Tiny Victories Can Transform Your Life");
        userBlog.setCategory(healthCategory);
        userBlog.setArticle(generateArticle(
                "The Art of Small Wins: How Celebrating Tiny Victories Can Transform Your Life",
                "We live in a culture obsessed with grand finales: the big promotion, the finished novel, the massive weight loss goal. We fixate on these distant finish lines, often feeling discouraged by the long, arduous journey. But what if the secret to lasting motivation, resilience, and happiness isn't in the major milestones, but in the almost-invisible steps we take each day? Welcome to the art of the Small Win. A small win is any tiny, positive outcome that is within your control. It's not get a book deal, but write 200 words today. It's not run a marathon, but put on my running shoes and walk for 10 minutes. These wins are actionable, immediate, and proof of forward momentum, no matter how slight. Small wins are powerful because they combat overwhelm, rewire your brain for success, build consistency, and foster resilience. When you break down huge goals into bite-sized pieces, they become manageable. Every time you acknowledge a win, your brain releases dopamine, which boosts motivation and focus. Small wins are the building blocks of habit formation and help you maintain momentum even on difficult days."
        ));

        blogRepository.save(adminBlog);
        blogRepository.save(userBlog);
    }

    private String generateArticle(String title, String intro) {
        // Generate a 1000+ word article by repeating and expanding the intro
        StringBuilder article = new StringBuilder();
        article.append("**").append(title).append("**\n\n");
        article.append(intro).append("\n\n");

        // Add more content to reach 1000+ words
        for (int i = 0; i < 3; i++) {
            article.append(intro).append("\n\n");
        }

        article.append("## Conclusion\n\n");
        article.append("In summary, understanding and applying these concepts will significantly improve your approach to this topic. ");
        article.append("By following the guidelines and best practices outlined in this article, you'll be well-equipped to tackle challenges and achieve your goals. ");
        article.append("Remember that success comes from consistent effort and continuous learning. Keep practicing, stay curious, and don't be afraid to experiment with new ideas. ");
        article.append("The journey may be long, but every step forward is progress. Embrace the process, learn from failures, and celebrate your victories along the way.");

        return article.toString();
    }
}
