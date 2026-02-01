package com.blogsite.blog.service;

import com.blogsite.blog.domain.Category;
import com.blogsite.blog.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Order(1)
public class CategorySeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    public CategorySeeder(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0) {
            return;
        }
        List<Category> categories = List.of(
                create("Technology and Programming", "Articles about software, hardware and IT"),
                create("Health and Lifestyle Guides", "Content focusing on wellness and lifestyle"),
                create("Travel and Adventure Stories", "Experiences and guides from around the world")
        );
        categoryRepository.saveAll(categories);
    }

    private Category create(String name, String description) {
        Category c = new Category();
        c.setName(name);
        c.setDescription(description);
        return c;
    }
}
