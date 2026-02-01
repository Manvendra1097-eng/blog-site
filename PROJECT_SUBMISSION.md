# BlogSite - Full-Stack Microservices Blogging Platform
## Project Submission Document

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [Key Features](#key-features)
5. [Implementation Details](#implementation-details)
6. [Screenshots](#screenshots)
7. [Setup and Execution](#setup-and-execution)
8. [Project Structure](#project-structure)
9. [Security Features](#security-features)
10. [Conclusion](#conclusion)

---

## 1. Project Overview

**Project Name:** BlogSite - Microservices Blogging Platform
**Student Name:** [Your Name]
**Student ID:** [Your ID]
**Course:** [Course Name]
**Submission Date:** February 1, 2026

### Project Description
BlogSite is a full-stack web application built using microservices architecture. It allows users to create, read, update, and delete blog posts with authentication and authorization mechanisms. The project demonstrates industry-standard practices including JWT authentication with automatic token refresh, API Gateway pattern, and modern frontend development.

### Problem Statement
Develop a scalable blogging platform where:
- Users can register and authenticate securely
- Authenticated users can create and manage their blog posts
- Blog posts are organized by categories
- The system should handle authentication efficiently without constant re-login
- The architecture should be scalable and maintainable

---

## 2. System Architecture

### Microservices Architecture Diagram

**[INSERT SCREENSHOT: Architecture Diagram showing Auth Service, Blog Service, API Gateway, Frontend, and MySQL databases]**

### Components Description

#### 2.1 Frontend (React + Vite)
- Modern single-page application (SPA)
- Communicates with backend through API Gateway
- Handles client-side routing and state management
- **Port:** 5173

#### 2.2 API Gateway (Spring Cloud Gateway)
- Single entry point for all client requests
- Routes requests to appropriate microservices
- JWT validation and authentication
- CORS configuration
- **Port:** 8080

#### 2.3 Auth Service
- User registration and login
- JWT token generation (Access + Refresh tokens)
- Token refresh mechanism
- User management
- **Port:** 8081
- **Database:** blog_auth

#### 2.4 Blog Service
- Blog post CRUD operations
- Category management
- Author-based access control
- **Port:** 8082
- **Database:** blog_content

#### 2.5 Database Layer
- **MySQL 8.0** - Two separate databases for service isolation
  - `blog_auth` - User authentication data
  - `blog_content` - Blog posts and categories

---

## 3. Technology Stack

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 21 | Core Programming Language |
| Spring Boot | 3.2.0 | Application Framework |
| Spring Cloud Gateway | 4.1.0 | API Gateway (Reactive) |
| Spring Security | 6.2.0 | Authentication & Authorization |
| Spring Data JPA | 3.2.0 | Data Persistence Layer |
| Hibernate | 6.4.0 | ORM Framework |
| MySQL | 8.0 | Relational Database |
| JJWT | 0.11.5 | JWT Token Management |
| Maven | 3.8+ | Build & Dependency Management |

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Library |
| Vite | 7.3.1 | Build Tool & Dev Server |
| Axios | 1.13.4 | HTTP Client with Interceptors |
| Tailwind CSS | 4.1.18 | Utility-first CSS Framework |
| Lucide React | 0.563.0 | Icon Library |
| shadcn/ui | Latest | Pre-built UI Components |

---

## 4. Key Features

### 4.1 Authentication & Authorization
✅ User registration with role assignment
✅ Secure login with JWT tokens
✅ Dual token system (Access token: 15 min, Refresh token: 7 days)
✅ Automatic token refresh using Axios interceptors
✅ Seamless user experience (no forced re-login for 7 days)
✅ Password encryption using BCrypt

### 4.2 Blog Management
✅ Create blog posts with title, category, and content
✅ View all blogs with category filtering
✅ Update own blog posts
✅ Delete own blog posts
✅ Author-based access control
✅ Pre-seeded categories and sample blogs

### 4.3 User Interface
✅ Responsive design (mobile, tablet, desktop)
✅ Modern dark theme with Tailwind CSS
✅ Toast notifications for user feedback
✅ Loading states and error handling
✅ Clean and intuitive navigation

### 4.4 Technical Excellence
✅ Microservices architecture
✅ API Gateway pattern
✅ Comprehensive exception handling
✅ Database seeding for demo purposes
✅ CORS configuration
✅ RESTful API design

---

## 5. Implementation Details

### 5.1 JWT Authentication Flow

**[INSERT SCREENSHOT: Sequence diagram or flowchart showing JWT authentication flow]**

#### Token Generation Process
1. User submits credentials (username/password)
2. Auth service validates credentials
3. Upon success, generates two tokens:
   - **Access Token**: Short-lived (15 minutes), used for API requests
   - **Refresh Token**: Long-lived (7 days), used to obtain new access tokens
4. Both tokens stored in localStorage on client side

#### Automatic Token Refresh
- Axios interceptor monitors all API responses
- On receiving 401 Unauthorized:
  1. Attempts token refresh using refresh token
  2. Retries original failed request with new access token
  3. If refresh fails, redirects to login
- User experiences seamless authentication without interruption

### 5.2 API Gateway Request Flow

**[INSERT SCREENSHOT: API Gateway request flow diagram]**

#### Request Processing Steps
1. **Client Request** → API Gateway receives request
2. **JWT Validation** → GatewayAuthenticationFilter validates JWT token
3. **Header Enrichment** → Gateway adds X-User-Id, X-User-Name, X-User-Roles headers
4. **Routing** → Routes to appropriate microservice (auth/blog)
5. **Service Processing** → Microservice uses Spring Security context
6. **Response** → Gateway returns response to client

### 5.3 Exception Handling Strategy

#### Auth Service Exception Handler
```java
@RestControllerAdvice
- IllegalArgumentException → 400 Bad Request
- BadCredentialsException → 401 Unauthorized
- MethodArgumentNotValidException → 400 with field errors
- Generic Exception → 500 Internal Server Error
```

#### Blog Service Exception Handler
```java
@RestControllerAdvice
- IllegalArgumentException → 400 Bad Request
- MethodArgumentNotValidException → 400 with validation errors
- Generic Exception → 500 Internal Server Error
```

#### API Gateway Exception Handler
```java
WebExceptionHandler (Reactive)
- JWT errors → 401 Unauthorized
- Connection refused → 503 Service Unavailable
- Generic errors → 500 Internal Server Error
```

---

## 6. Screenshots

### 6.1 User Authentication

**Screenshot 1: Login Page**
**[INSERT SCREENSHOT: Login page with username/password fields]**
_Description: Clean login interface with form validation_

**Screenshot 2: Registration Page**
**[INSERT SCREENSHOT: Registration form with all fields]**
_Description: User registration with username, password, and role selection_

---

### 6.2 Blog Management

**Screenshot 3: Home Page - Blog List**
**[INSERT SCREENSHOT: Home page showing all blogs in card layout]**
_Description: Grid layout displaying all blog posts with categories, showing "Technology and Programming", "Health and Lifestyle Guides", and "Travel and Adventure Stories" categories_

**Screenshot 4: Create New Blog**
**[INSERT SCREENSHOT: Create blog form with title, category, and content fields]**
_Description: Form to create a new blog post with dropdown for category selection_

**Screenshot 5: Blog Detail View**
**[INSERT SCREENSHOT: Full blog post view with content and metadata]**
_Description: Detailed blog view showing title, author, category, publish date, and full article content_

**Screenshot 6: Edit Blog**
**[INSERT SCREENSHOT: Edit form with pre-filled blog data]**
_Description: Edit interface for updating blog title, category, and content (only visible to blog author)_

---

### 6.3 Category Filtering

**Screenshot 7: Category Filter**
**[INSERT SCREENSHOT: Blogs filtered by specific category]**
_Description: Demonstrates filtering functionality showing only blogs from selected category_

---

### 6.4 User Interface Features

**Screenshot 8: Responsive Design - Mobile View**
**[INSERT SCREENSHOT: Mobile view of the application]**
_Description: Mobile-optimized layout showing responsive design_

**Screenshot 9: Toast Notifications**
**[INSERT SCREENSHOT: Success/error toast notification]**
_Description: User feedback system showing success or error messages_

**Screenshot 10: Loading States**
**[INSERT SCREENSHOT: Loading spinner or skeleton screens]**
_Description: Loading indicators while fetching data_

---

### 6.5 Backend Services

**Screenshot 11: API Gateway Console**
**[INSERT SCREENSHOT: API Gateway startup logs]**
_Description: Terminal showing API Gateway running on port 8080_

**Screenshot 12: Auth Service Console**
**[INSERT SCREENSHOT: Auth Service startup logs]**
_Description: Terminal showing Auth Service running on port 8081_

**Screenshot 13: Blog Service Console**
**[INSERT SCREENSHOT: Blog Service startup logs]**
_Description: Terminal showing Blog Service running on port 8082_

**Screenshot 14: MySQL Databases**
**[INSERT SCREENSHOT: MySQL Workbench or CLI showing blog_auth and blog_content databases]**
_Description: Database structure showing separated databases for each service_

---

### 6.6 API Testing

**Screenshot 15: Postman/Thunder Client - Login API**
**[INSERT SCREENSHOT: API testing tool showing login request/response]**
_Description: POST /auth/login returning access and refresh tokens_

**Screenshot 16: Postman/Thunder Client - Create Blog API**
**[INSERT SCREENSHOT: API testing tool showing create blog request]**
_Description: POST /blogs with JWT authentication header_

**Screenshot 17: Postman/Thunder Client - Token Refresh**
**[INSERT SCREENSHOT: API testing tool showing refresh token endpoint]**
_Description: POST /auth/refresh returning new token pair_

---

### 6.7 Code Structure

**Screenshot 18: Project Structure**
**[INSERT SCREENSHOT: VS Code file explorer showing complete project structure]**
_Description: Overall project organization with all microservices_

**Screenshot 19: Auth Service Code**
**[INSERT SCREENSHOT: AuthController.java or JwtService.java]**
_Description: Key authentication implementation code_

**Screenshot 20: Blog Service Code**
**[INSERT SCREENSHOT: BlogController.java]**
_Description: Blog CRUD operations implementation_

**Screenshot 21: Frontend Axios Interceptor**
**[INSERT SCREENSHOT: apiClient.js showing token refresh interceptor]**
_Description: Automatic token refresh implementation_

---

## 7. Setup and Execution

### 7.1 Prerequisites
- ✅ Java 21 or higher
- ✅ Maven 3.8+
- ✅ Node.js 18+
- ✅ MySQL 8.0
- ✅ Git

### 7.2 Database Setup
```sql
-- MySQL automatically creates these databases on first run
CREATE DATABASE IF NOT EXISTS blog_auth;
CREATE DATABASE IF NOT EXISTS blog_content;
```

### 7.3 One-Command Setup

The project includes an automated setup script:

**Screenshot 22: Running setup-and-run.bat**
**[INSERT SCREENSHOT: Terminal showing setup script execution]**
_Description: One-command setup that installs dependencies and starts all services_

```batch
# Run from project root
setup-and-run.bat
```

This script:
1. ✅ Installs frontend dependencies (npm install)
2. ✅ Starts Auth Service (port 8081)
3. ✅ Starts Blog Service (port 8082)
4. ✅ Starts API Gateway (port 8080)
5. ✅ Starts Frontend (port 5173)
6. ✅ Opens browser automatically

### 7.4 Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Terminal 1 - Auth Service
cd auth-service
mvn spring-boot:run -Dspring-boot.run.profiles=local

# Terminal 2 - Blog Service
cd blog-service
mvn spring-boot:run -Dspring-boot.run.profiles=local

# Terminal 3 - API Gateway
cd api-gateway
mvn spring-boot:run -Dspring-boot.run.profiles=local

# Terminal 4 - Frontend
cd frontend
npm install
npm run dev
```

### 7.5 Accessing the Application

- **Frontend:** http://localhost:5173
- **API Gateway:** http://localhost:8080
- **Auth Service:** http://localhost:8081
- **Blog Service:** http://localhost:8082

### 7.6 Default Credentials

For testing, use these pre-seeded accounts:

| Username | Password | Role | Purpose |
|----------|----------|------|---------|
| admin | admin123 | ADMIN | Full access account |
| user | user123 | USER | Regular user account |

---

## 8. Project Structure

```
BlogSite/
├── .github/
│   └── copilot-instructions.md        # Project documentation
├── api-gateway/                        # Spring Cloud Gateway
│   ├── src/main/java/com/blogsite/gateway/
│   │   ├── config/
│   │   │   └── SecurityConfig.java    # CORS & Security config
│   │   ├── security/
│   │   │   ├── JwtService.java        # JWT validation
│   │   │   └── GatewayAuthenticationFilter.java
│   │   └── exception/
│   │       └── GlobalErrorWebExceptionHandler.java
│   └── pom.xml
├── auth-service/                       # Authentication microservice
│   ├── src/main/java/com/blogsite/auth/
│   │   ├── domain/
│   │   │   └── User.java              # User entity
│   │   ├── repository/
│   │   │   └── UserRepository.java
│   │   ├── service/
│   │   │   ├── JwtService.java        # Token generation
│   │   │   └── UserSeeder.java        # Demo user seeding
│   │   ├── web/
│   │   │   ├── AuthController.java    # Auth endpoints
│   │   │   └── GlobalExceptionHandler.java
│   │   └── config/
│   │       └── SecurityConfig.java
│   └── pom.xml
├── blog-service/                       # Blog management microservice
│   ├── src/main/java/com/blogsite/blog/
│   │   ├── domain/
│   │   │   ├── Blog.java              # Blog entity
│   │   │   └── Category.java          # Category entity
│   │   ├── repository/
│   │   │   ├── BlogRepository.java
│   │   │   └── CategoryRepository.java
│   │   ├── service/
│   │   │   ├── BlogService.java
│   │   │   ├── CategorySeeder.java    # Demo categories
│   │   │   └── BlogSeeder.java        # Demo blogs
│   │   ├── web/
│   │   │   ├── BlogController.java    # Blog CRUD endpoints
│   │   │   └── GlobalExceptionHandler.java
│   │   └── config/
│   │       ├── SecurityConfig.java
│   │       └── GatewayAuthenticationFilter.java
│   └── pom.xml
├── frontend/                           # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/                    # Reusable UI components
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── BlogDetailPage.jsx
│   │   ├── services/
│   │   │   ├── apiClient.js           # Axios with interceptors
│   │   │   ├── authApi.js
│   │   │   └── blogApi.js
│   │   ├── hooks/
│   │   │   └── useAuth.js             # Authentication hook
│   │   ├── constants/
│   │   │   └── categories.js
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml                  # Docker deployment config
├── setup-and-run.bat                   # One-command setup script
├── stop-services.bat                   # Stop all services
├── PRESENTATION.md                     # Detailed project documentation
└── .gitignore
```

---

## 9. Security Features

### 9.1 Password Security
- Passwords encrypted using **BCrypt** hashing algorithm
- Salt automatically generated for each password
- Passwords never stored in plain text

### 9.2 JWT Security
- Tokens signed with **HS256** algorithm
- Secret key stored securely (not in repository)
- Token expiration enforced
- Separate access and refresh tokens for security

### 9.3 API Security
- All endpoints behind API Gateway
- JWT validation before routing requests
- Role-based access control (RBAC)
- CORS configured to prevent unauthorized access

### 9.4 Database Security
- Separate databases for each microservice
- Credentials configurable via environment variables
- Connection pooling for performance

### 9.5 Exception Handling
- Generic error messages to prevent information leakage
- Detailed logging for debugging (server-side only)
- No stack traces exposed to clients
- Standardized error response format

---

## 10. Conclusion

### Project Achievements
This project successfully demonstrates:

✅ **Microservices Architecture**: Implemented three independent services (Auth, Blog, Gateway)
✅ **Modern Tech Stack**: Used latest versions of Spring Boot, React, and supporting libraries
✅ **Security Best Practices**: JWT authentication, password encryption, CORS
✅ **Scalability**: Each service can be scaled independently
✅ **User Experience**: Automatic token refresh, responsive design, intuitive UI
✅ **Code Quality**: Exception handling, clean code, organized structure
✅ **Documentation**: Comprehensive documentation and easy setup

### Learning Outcomes
Through this project, I gained hands-on experience with:
- Building microservices with Spring Boot
- Implementing JWT authentication with refresh tokens
- Creating reactive applications with Spring WebFlux
- Modern frontend development with React and Vite
- API Gateway pattern implementation
- Database design and seeding
- Axios interceptors for automatic request handling
- Responsive UI design with Tailwind CSS

### Future Enhancements
Potential improvements for this project:
- [ ] Add user profile management
- [ ] Implement blog comments and likes
- [ ] Add blog search functionality
- [ ] Integrate file upload for blog images
- [ ] Add email verification for registration
- [ ] Implement password reset functionality
- [ ] Add pagination for blog listing
- [ ] Deploy to cloud platform (AWS/Azure/GCP)
- [ ] Add Docker Compose for easy deployment
- [ ] Implement caching with Redis
- [ ] Add API rate limiting

### Acknowledgments
Special thanks to the course instructors and teaching assistants for their guidance throughout this project.

---

## Appendix

### A. Project Zip File

**[ATTACH ZIP FILE HERE]**

**📦 Zip File Name:** BlogSite_Project_[YourName].zip

**Zip Contents:**
```
BlogSite/
├── All source code files
├── Configuration files
├── Documentation (PRESENTATION.md, README.md)
├── Setup scripts (setup-and-run.bat, stop-services.bat)
└── .gitignore
```

**Note:** The zip file excludes:
- `node_modules/` folder (can be restored with `npm install`)
- `target/` folders (generated during Maven build)
- `.git/` folder
- IDE-specific files

### B. GitHub Repository
**Repository Link:** https://github.com/Manvendra1097-eng/blog-site

### C. Video Demo (Optional)
**[INSERT LINK to video demonstration if available]**

### D. Contact Information
**Student Name:** [Your Name]
**Email:** [Your Email]
**GitHub:** https://github.com/Manvendra1097-eng
**Phone:** [Your Phone]

---

**End of Document**

---

**Document prepared by:** [Your Name]
**Date:** February 1, 2026
**Project:** BlogSite - Full-Stack Microservices Blogging Platform
