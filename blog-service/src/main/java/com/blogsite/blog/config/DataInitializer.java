package com.blogsite.blog.config;

import com.blogsite.blog.domain.Category;
import com.blogsite.blog.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

/**
 * Initializes default categories in the database on application startup.
 */
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initCategories(CategoryRepository categoryRepository) {
        return args -> {
            List<String> defaultCategories = Arrays.asList(
                    "Technology and Programming",
                    "Health and Lifestyle Guides",
                    "Travel and Adventure Stories"
            );

            for (String categoryName : defaultCategories) {
                if (!categoryRepository.existsByName(categoryName)) {
                    Category category = new Category();
                    category.setName(categoryName);
                    categoryRepository.save(category);
                    System.out.println("Seeded category: " + categoryName);
                }
            }

            System.out.println("Category initialization complete. Total categories: "
                    + categoryRepository.count());
        };
    }
}
