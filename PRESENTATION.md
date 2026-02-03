# BlogSite - Full-Stack Microservices Blogging Platform
## Project Presentation

---

## 📋 Table of Contents
1. Project Overview
2. Architecture & Design
3. Technology Stack
4. Key Features
5. Security Implementation
6. Technical Highlights
7. Database Schema
8. API Endpoints
9. Setup & Deployment
10. Challenges & Solutions
11. Future Enhancements
12. Project Metrics
13. Learning Outcomes
14. Conclusion

---

## 1. Project Overview

### 🎯 Objective
Build a modern, scalable blogging platform using microservices architecture with robust authentication and authorization.

### 🔍 Problem Statement
- Traditional monolithic applications face scalability challenges
- Need for secure, token-based authentication
- Requirement for independent service deployment
- User experience with seamless session management

### ✅ Solution
A microservices-based blogging platform with:
- Separate authentication and content management services
- API Gateway for unified access
- JWT-based security with automatic token refresh
- React frontend with modern UI/UX

---

## 2. Architecture & Design

### System Architecture
```
┌─────────────────────────────────────────────────────┐
│         Frontend (React + Vite)                     │
│         http://localhost:5173                       │
└─────────────────┬───────────────────────────────────┘
                  │
                  │ HTTP/REST
                  ▼
┌─────────────────────────────────────────────────────┐
│         API Gateway (Spring Cloud Gateway)          │
│         Port: 8083                                  │
│         - Authentication                            │
│         - Routing                                   │
│         - CORS Configuration                        │
└────────┬──────────────────────┬─────────────────────┘
         │                      │
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│  Auth Service   │    │  Blog Service   │
│  Port: 8081     │    │  Port: 8082     │
│                 │    │                 │
│  - User Mgmt    │    │  - Blog CRUD    │
│  - JWT Tokens   │    │  - Categories   │
│  - Login/Reg    │    │  - Filtering    │
└────────┬────────┘    └────────┬────────┘
         │                      │
         ▼                      ▼
┌─────────────────┐    ┌─────────────────┐
│  MySQL DB       │    │  MySQL DB       │
│  blog_auth      │    │  blog_content   │
└─────────────────┘    └─────────────────┘
```

### Design Patterns Used
1. **Microservices Architecture** - Independent, loosely coupled services
2. **API Gateway Pattern** - Single entry point for all client requests
3. **Repository Pattern** - Data access abstraction
4. **Interceptor Pattern** - Automatic token refresh on frontend
5. **Filter Pattern** - Security filters for authentication
6. **Seeder Pattern** - Database initialization with test data

---

## 3. Technology Stack

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.2.0 | Application Framework |
| Spring Cloud Gateway | 4.1.0 | API Gateway |
| Spring Security | 6.2.0 | Authentication & Authorization |
| Spring Data JPA | 3.2.0 | Data Persistence |
| Hibernate | 6.4.0 | ORM Framework |
| MySQL | 8.0 | Database |
| JJWT | 0.11.5 | JWT Token Generation |
| Maven | 3.8+ | Build Tool |

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| Vite | 7.3.1 | Build Tool & Dev Server |
| React Router | 7.5.1 | Client-side Routing |
| Axios | 1.13.4 | HTTP Client |
| React Hook Form | 7.54.2 | Form Management |
| Zod | 3.24.1 | Schema Validation |
| Tailwind CSS | 4.1.18 | Styling |
| Lucide React | 0.563.0 | Icons |
| Sonner | 1.7.3 | Toast Notifications |

### Development Tools
- Git for version control
- Docker Compose for containerization
- VS Code / IntelliJ IDEA
- MySQL Workbench

---

## 4. Key Features

### 🔐 Authentication & Authorization
- ✅ User Registration with validation
  - Username: min 3 characters
  - Password: min 8 characters, alphanumeric
  - Email: valid email format
- ✅ Secure Login with JWT tokens
- ✅ Role-based access control (USER, ADMIN)
- ✅ Automatic token refresh (seamless UX)
- ✅ Access tokens: 15 minutes
- ✅ Refresh tokens: 7 days

### 📝 Blog Management
- ✅ Create blogs with validations
  - Blog name: minimum 20 characters
  - Category: minimum 20 characters
  - Article: minimum 1000 words
- ✅ Update own blogs
- ✅ Delete own blogs (admins can delete any)
- ✅ View all blogs (public access)
- ✅ Filter by category
- ✅ Date range filtering
- ✅ Author information display

### 🏷️ Category Management
- ✅ Predefined categories
- ✅ Admin-only category creation
- ✅ Category-based blog filtering

### 👥 User Roles
**Regular User:**
- Create, update, delete own blogs
- View all blogs
- Browse by category

**Admin:**
- All user permissions
- Delete any blog
- Create categories
- System administration

---

## 5. Security Implementation

### JWT Token Architecture

#### Token Types
1. **Access Token** (15 minutes)
   - Used for API requests
   - Short-lived for security
   - Contains: userId, username, roles, type: "access"

2. **Refresh Token** (7 days)
   - Used to obtain new access tokens
   - Long-lived for UX
   - Contains: userId, username, roles, type: "refresh"

### Token Flow
```
1. User Login
   ├─> Validate credentials
   ├─> Generate Access Token (15 min)
   ├─> Generate Refresh Token (7 days)
   └─> Return both tokens

2. API Request
   ├─> Send Access Token in header
   ├─> Gateway validates token
   ├─> Gateway checks token type = "access"
   └─> Forward request with user context

3. Token Expired (401)
   ├─> Frontend intercepts 401 error
   ├─> Automatically call /refresh with refresh token
   ├─> Get new token pair
   ├─> Retry original request
   └─> User sees no interruption

4. Refresh Token Expired
   ├─> Redirect to login
   └─> User logs in again
```

### Security Features
- ✅ Password hashing (BCrypt)
- ✅ JWT signature validation
- ✅ Token type validation (access vs refresh)
- ✅ HttpOnly cookies for refresh tokens (XSS protection)
- ✅ Ownership validation for blog operations
- ✅ CORS configuration
- ✅ Gateway-level authentication
- ✅ Secure headers (X-User-Id, X-User-Name, X-User-Roles)
- ✅ Role-based authorization (ADMIN/USER)

---

## 6. Technical Highlights

### 1. Automatic Token Refresh (Axios Interceptor)

**Frontend: apiClient.js**
```javascript
// Response interceptor - catches 401 errors
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Token expired - refresh automatically
            const newToken = await refreshAccessToken();
            // Retry original request with new token
            return apiClient(originalRequest);
        }
        return Promise.reject(error);
    }
);
```

**Benefits:**
- User never sees "session expired"
- Seamless 7-day sessions
- No page refresh needed
- Better UX

### 2. Gateway Authentication Filter

**Gateway validates JWT and forwards user context:**
```java
// Extract user info from JWT
String userId = claims.getSubject();
String username = claims.get("username", String.class);
String roles = claims.get("roles", String.class);

// Forward to downstream services via headers
ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
    .header("X-User-Id", userId)
    .header("X-User-Name", username)
    .header("X-User-Roles", roles)
    .build();
```

**Benefits:**
- Single authentication point
- Services trust gateway
- No token validation in each service
- Clean separation of concerns

### 3. Spring Security Integration

**Blog Service uses Security Context:**
```java
// Extract user from Spring Security context
private Long getUserId() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    return Long.parseLong((String) auth.getPrincipal());
}

// Use in controllers - no manual header reading
@PostMapping("/user/blogs/add/{blogname}")
public ResponseEntity<?> addBlog(@PathVariable String blogName, ...) {
    Blog blog = blogService.addBlog(getUserId(), getUserName(), ...);
    return ResponseEntity.ok(blog);
}
```

**Benefits:**
- No redundant @RequestHeader parameters
- Cleaner controller methods
- Can use @PreAuthorize annotations
- Standard Spring Security practices

### 4. Frontend Architecture & Routing

**React Context API for Auth State:**
```javascript
// AuthContext.jsx - Global auth state
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);
    const [roles, setRoles] = useState([]);

    const isAdmin = roles.includes('ADMIN');

    // Login, logout, and refresh logic
    return <AuthContext.Provider value={{...}}>
}
```

**Protected Routes Structure:**
```javascript
// routes/index.jsx
<Routes>
    <Route path="/" element={<LandingPage />} />  {/* Public */}
    <Route path="/login" element={<LoginPage />} /> {/* Public */}

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/blog/create" element={<CreateBlogPage />} />
        <Route path="/home/blog/:id" element={<ViewBlogPage />} />
        <Route path="/home/blog/edit/:id" element={<EditBlogPage />} />
    </Route>
</Routes>
```

**Benefits:**
- Centralized auth state management
- Protected routes with automatic redirect
- Clean separation of public and authenticated pages
- Reusable auth hook (useAuth)
- Consistent header/footer for public pages

### 5. HttpOnly Cookie Implementation

**Backend - Login sets refresh token as cookie:**
```java
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // Validate credentials and generate tokens
    String accessToken = jwtService.generateAccessToken(...);
    String refreshToken = jwtService.generateRefreshToken(...);

    // Set refresh token as httpOnly cookie
    ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
        .httpOnly(true)  // Not accessible to JavaScript
        .secure(false)   // Set to true in production (HTTPS)
        .path("/")
        .sameSite("Lax")
        .maxAge(7 * 24 * 60 * 60)  // 7 days
        .build();

    // Return only accessToken, username, roles in body
    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
        .body(Map.of(
            "accessToken", accessToken,
            "username", user.getUsername(),
            "roles", user.getRoles()
        ));
}
```

**Backend - Refresh reads from cookie:**
```java
@PostMapping("/refresh")
public ResponseEntity<?> refresh(
    @CookieValue(name = "refreshToken", required = false) String refreshToken) {

    if (refreshToken == null || refreshToken.isBlank()) {
        return ResponseEntity.status(401).body("No refresh token");
    }

    // Validate and generate new tokens
    String newAccessToken = jwtService.generateAccessToken(...);
    String newRefreshToken = jwtService.generateRefreshToken(...);

    // Return new refresh token as cookie
    ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", newRefreshToken)
        .httpOnly(true)
        .secure(false)
        .path("/")
        .sameSite("Lax")
        .maxAge(7 * 24 * 60 * 60)
        .build();

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
        .body(Map.of("accessToken", newAccessToken, "username", username));
}
```

**Frontend - Axios sends credentials:**
```javascript
export const apiClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true  // Sends httpOnly cookies automatically
});
```

**Benefits:**
- Refresh token not accessible to JavaScript (XSS protection)
- Automatically sent with requests
- Server-side cookie management
- Enhanced security posture

---

## 7. Database Schema

### Database: blog_auth

#### Table: users
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| username | VARCHAR(50) | UNIQUE, NOT NULL |
| email | VARCHAR(100) | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

#### Table: user_roles
| Column | Type | Constraints |
|--------|------|-------------|
| user_id | BIGINT | FOREIGN KEY → users(id) |
| roles | VARCHAR(20) | ENUM('USER', 'ADMIN') |

### Database: blog_content

#### Table: categories
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR(100) | UNIQUE, NOT NULL |
| description | TEXT | |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

#### Table: blogs
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| author_id | BIGINT | NOT NULL |
| author_name | VARCHAR(50) | NOT NULL |
| blog_name | VARCHAR(255) | NOT NULL |
| article | TEXT | NOT NULL |
| category_id | BIGINT | FOREIGN KEY → categories(id) |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |

---

## 8. API Endpoints

### Authentication Service (Port 8081)

#### POST /api/v1.0/blogsite/user/register
**Request:**
```json
{
    "username": "john",
    "email": "john@example.com",
    "password": "John1234"
}
```
**Response:** 200 OK
```json
{
    "id": 3,
    "username": "john",
    "email": "john@example.com"
}
```

#### POST /api/v1.0/blogsite/user/login
**Request:**
```json
{
    "username": "admin",
    "password": "Admin1234"
}
```
**Response:** 200 OK
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "username": "admin",
    "roles": ["ADMIN", "USER"]
}
```
**Response Headers:**
```
Set-Cookie: refreshToken=eyJhbGciOiJIUzI1NiJ9...; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax
```
**Note:** Refresh token is sent as httpOnly cookie, not in response body for security.

#### POST /api/v1.0/blogsite/user/refresh
**Request:** No body required
**Request Headers:**
```
Cookie: refreshToken=eyJhbGciOiJIUzI1NiJ9...
```
**Response:** 200 OK
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
    "username": "admin"
}
```
**Response Headers:**
```
Set-Cookie: refreshToken=eyJhbGciOiJIUzI1NiJ9...; Path=/; Max-Age=604800; HttpOnly; SameSite=Lax
```
**Note:** Refresh token sent via httpOnly cookie automatically by browser.

### Blog Service (Port 8082)

#### GET /api/v1.0/blogsite/blogs/all
**Auth:** None (Public)
**Response:** 200 OK
```json
[
    {
        "id": 1,
        "blogName": "Getting Started with Microservices",
        "authorName": "admin",
        "category": { "id": 1, "name": "Technology and Programming" },
        "createdAt": "2026-02-01T10:30:00"
    }
]
```

#### POST /api/v1.0/blogsite/user/blogs/add/{blogname}
**Auth:** Required
**Request:**
```json
{
    "category": "Technology and Programming",
    "article": "Article content with minimum 1000 words..."
}
```
**Response:** 200 OK

#### PUT /api/v1.0/blogsite/user/blogs/update/{id}
**Auth:** Required (Owner only)
**Request:**
```json
{
    "blogName": "Updated Blog Title",
    "category": "Health and Lifestyle Guides",
    "article": "Updated content..."
}
```

#### DELETE /api/v1.0/blogsite/user/delete/{blogname}
**Auth:** Required (Owner or Admin)

#### GET /api/v1.0/blogsite/blogs/info/{category}
**Auth:** None
**Response:** List of blogs in category

#### GET /api/v1.0/blogsite/blogs/get/{category}/{from}/{to}
**Auth:** None
**Params:**
- from: 2026-01-01
- to: 2026-02-01

---

## 9. Setup & Deployment

### Prerequisites
- ✅ Java 17+
- ✅ Maven 3.8+
- ✅ Node.js 18+
- ✅ MySQL 8.0
- ✅ MySQL credentials: root / Manvendra

### One-Command Setup
```cmd
setup-and-run.bat
```

**What it does:**
1. Checks MySQL is running
2. Installs frontend dependencies (npm install)
3. Starts Auth Service (port 8081)
4. Starts Blog Service (port 8082)
5. Starts API Gateway (port 8080)
6. Starts Frontend (port 5173)
7. Opens browser automatically

### Manual Setup
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

### Docker Deployment
```bash
docker-compose up --build
```

### Stop Services
```cmd
stop-services.bat
```

### Access Points
- **Frontend:** http://localhost:5173
- **API Gateway:** http://localhost:8083
- **Auth Service:** http://localhost:8081
- **Blog Service:** http://localhost:8082

### Default Users
| Username | Password | Role |
|----------|----------|------|
| admin | Admin1234 | ADMIN, USER |
| user | User1234 | USER |

---

## 10. Challenges & Solutions

### Challenge 1: Token Expiration UX
**Problem:** Users would get logged out every 15 minutes when access token expired.

**Solution:** Implemented automatic token refresh using Axios interceptors.
- Intercepts 401 responses
- Automatically calls refresh endpoint
- Retries original request with new token
- User experiences seamless 7-day sessions

### Challenge 2: Security vs Simplicity
**Problem:** Redis added complexity without significant benefit for our use case.

**Solution:** Removed Redis, using stateless JWT approach.
- Reduced infrastructure requirements
- Faster token validation (no Redis lookup)
- Easier deployment and scaling
- Still secure with short-lived access tokens

### Challenge 3: Port Conflicts in Docker
**Problem:** Port 8080 already in use on deployment machines.

**Solution:** Changed API Gateway to port 8083.
- Updated docker-compose.yml
- Updated frontend API configuration
- Now uses: 8081 (Auth), 8082 (Blog), 8083 (Gateway)

### Challenge 4: React Fast Refresh Warnings
**Problem:** Context export and component export in same file broke Fast Refresh.

**Solution:** Separated exports into multiple files.
- authContext.js: exports AuthContext
- AuthContext.jsx: exports AuthProvider component
- useAuth.js: exports useAuth hook

### Challenge 5: Admin Authorization
**Problem:** Initially checked admin by username === "admin" (hardcoded, insecure).

**Solution:** Implemented role-based authorization.
- Roles returned from backend login
- Stored in AuthContext and localStorage
- Computed `isAdmin` property in context
- Used consistently across app

### Challenge 6: Public vs Protected UI
**Problem:** Landing page needed for non-authenticated users, but all routes were protected.

**Solution:** Created public route structure with shared components.
- LandingPage at "/" (public)
- LoginPage with public header/footer
- Protected routes under "/home/*"
- PublicHeader and PublicFooter components for consistency

---

## 11. Future Enhancements

### Security

- [ ] Refresh token rotation (new refresh token on each refresh)
- [ ] Database-backed refresh tokens (enable server-side revocation)
- [ ] Rate limiting (prevent brute force attacks)
- [ ] Two-factor authentication (2FA)
- [ ] OAuth2 integration (Google, GitHub login)

### Features
- [ ] Rich text editor (markdown or WYSIWYG)
- [ ] Image upload and management
- [ ] Comment system
- [ ] Blog likes/reactions
- [ ] User profiles with bio
- [ ] Follow/Unfollow authors
- [ ] Email notifications
- [ ] Search functionality (full-text search)
- [ ] Tags system (in addition to categories)
- [ ] Draft save feature
- [ ] Blog versioning

### Technical
- [ ] Elasticsearch for advanced search
- [ ] Redis caching for popular blogs
- [ ] CDN integration for static assets
- [ ] WebSocket for real-time notifications
- [ ] GraphQL API option
- [ ] Kubernetes deployment configuration
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Monitoring (Prometheus + Grafana)
- [ ] Distributed tracing (Zipkin)
- [ ] API documentation (Swagger/OpenAPI)

### Analytics
- [ ] Blog view counter
- [ ] User activity dashboard
- [ ] Popular blogs widget
- [ ] Author statistics

---

## 📊 Project Metrics

- **Total Services:** 3 (Auth, Blog, Gateway)
- **Total Endpoints:** 12+ REST APIs
- **Test Data:** 2 users, 3 categories, 2 blogs
- **Setup Time:** < 2 minutes
- **Security:** JWT with dual tokens, automatic refresh

---

## 🎓 Learning Outcomes

### Technical Skills
✅ Microservices architecture design
✅ Spring Boot and Spring Cloud
✅ JWT authentication and authorization
✅ React and modern frontend development
✅ RESTful API design
✅ Database design and JPA
✅ Docker containerization
✅ API Gateway pattern
✅ Security best practices

### Soft Skills
✅ Problem-solving
✅ System design thinking
✅ Code refactoring
✅ Documentation
✅ Project presentation

---

## 🎉 Conclusion

BlogSite demonstrates a modern, scalable approach to building web applications using:
- ✅ Microservices architecture
- ✅ Robust security with JWT
- ✅ Clean code practices
- ✅ User-friendly experience
- ✅ Easy deployment

**Key Achievements:**
1. Successfully implemented token refresh mechanism
2. Simplified architecture by removing Redis
3. Created seamless user experience
4. Built scalable, maintainable codebase
5. One-command setup for development

---

## 📚 References & Resources

- Spring Boot Documentation: https://spring.io/projects/spring-boot
- Spring Cloud Gateway: https://spring.io/projects/spring-cloud-gateway
- JWT Introduction: https://jwt.io/introduction
- Microservices Patterns: https://microservices.io/
- React Documentation: https://react.dev/

---
