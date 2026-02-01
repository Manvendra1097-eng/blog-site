# Screenshot Guide for Project Submission

This guide helps you capture all required screenshots for the PROJECT_SUBMISSION.md document.

## 🎯 Screenshots Needed: 22 Total

---

## 1. Architecture & Design (2 screenshots)

### Screenshot 1: Architecture Diagram
- **Tool:** Draw.io, PowerPoint, or Lucidchart
- **Content:** Show Auth Service, Blog Service, API Gateway, Frontend, MySQL databases
- **Include:** Arrows showing data flow, port numbers
- **Location in Doc:** Section 2 - System Architecture

### Screenshot 2: JWT Authentication Flow
- **Tool:** Draw.io, Sequence diagram tool
- **Content:** User → Frontend → Gateway → Auth Service flow
- **Include:** Login, token generation, token refresh steps
- **Location in Doc:** Section 5.1

---

## 2. User Authentication (2 screenshots)

### Screenshot 3: Login Page
- **Steps:**
  1. Open http://localhost:5173
  2. Capture the login page
- **Show:** Username and password fields, login button
- **Location in Doc:** Section 6.1

### Screenshot 4: Registration Page
- **Steps:**
  1. Click "Register" on login page
  2. Capture registration form
- **Show:** All form fields (username, password, role dropdown)
- **Location in Doc:** Section 6.1

---

## 3. Blog Management (4 screenshots)

### Screenshot 5: Home Page - Blog List
- **Steps:**
  1. Login as admin/user
  2. Capture home page with blog cards
- **Show:** Multiple blog cards, categories, navigation
- **Location in Doc:** Section 6.2

### Screenshot 6: Create New Blog
- **Steps:**
  1. Click "Create Blog" button
  2. Capture the form
- **Show:** Title, category dropdown, article textarea
- **Location in Doc:** Section 6.2

### Screenshot 7: Blog Detail View
- **Steps:**
  1. Click on any blog card
  2. Capture full blog view
- **Show:** Title, author, date, category, full content
- **Location in Doc:** Section 6.2

### Screenshot 8: Edit Blog
- **Steps:**
  1. Open your own blog
  2. Click edit button
  3. Capture edit form
- **Show:** Pre-filled form with blog data
- **Location in Doc:** Section 6.2

---

## 4. Category Filtering (1 screenshot)

### Screenshot 9: Category Filter
- **Steps:**
  1. On home page, select a category filter
  2. Capture filtered results
- **Show:** Only blogs from selected category
- **Location in Doc:** Section 6.3

---

## 5. UI Features (3 screenshots)

### Screenshot 10: Mobile View
- **Steps:**
  1. Open browser DevTools (F12)
  2. Toggle device toolbar
  3. Select mobile device (iPhone/Android)
  4. Capture responsive layout
- **Show:** Mobile-optimized view
- **Location in Doc:** Section 6.4

### Screenshot 11: Toast Notification
- **Steps:**
  1. Perform an action (create blog, login, etc.)
  2. Capture the toast notification
- **Show:** Success or error message toast
- **Location in Doc:** Section 6.4

### Screenshot 12: Loading State
- **Steps:**
  1. Refresh page and quickly capture loading spinner
  2. Or use DevTools to throttle network (Slow 3G)
- **Show:** Loading indicator
- **Location in Doc:** Section 6.4

---

## 6. Backend Services (4 screenshots)

### Screenshot 13: API Gateway Console
- **Steps:**
  1. Capture terminal running API Gateway
  2. Show startup logs with port 8080
- **Show:** Spring Boot banner, application started message
- **Location in Doc:** Section 6.5

### Screenshot 14: Auth Service Console
- **Steps:**
  1. Capture terminal running Auth Service
  2. Show startup logs with port 8081
- **Show:** Spring Boot banner, database connection, started message
- **Location in Doc:** Section 6.5

### Screenshot 15: Blog Service Console
- **Steps:**
  1. Capture terminal running Blog Service
  2. Show startup logs with port 8082
- **Show:** Spring Boot banner, seeder logs, started message
- **Location in Doc:** Section 6.5

### Screenshot 16: MySQL Databases
- **Steps:**
  1. Open MySQL Workbench or run: `SHOW DATABASES;`
  2. Capture showing blog_auth and blog_content
  3. Optional: Show table structure
- **Show:** Both databases with tables
- **Location in Doc:** Section 6.5

---

## 7. API Testing (3 screenshots)

### Screenshot 17: Login API
- **Tool:** Postman, Thunder Client, or curl
- **Steps:**
  1. POST http://localhost:8080/auth/login
  2. Body: {"username":"admin","password":"admin123"}
  3. Capture response with tokens
- **Show:** accessToken and refreshToken in response
- **Location in Doc:** Section 6.6

### Screenshot 18: Create Blog API
- **Tool:** Postman, Thunder Client
- **Steps:**
  1. POST http://localhost:8080/blogs
  2. Add Authorization header: Bearer {accessToken}
  3. Body: {"blogName":"Test","categoryId":1,"article":"Content"}
  4. Capture request and response
- **Show:** Authorization header, request body, 201 response
- **Location in Doc:** Section 6.6

### Screenshot 19: Token Refresh API
- **Tool:** Postman, Thunder Client
- **Steps:**
  1. POST http://localhost:8080/auth/refresh
  2. Add Authorization header: Bearer {refreshToken}
  3. Capture response with new tokens
- **Show:** New accessToken and refreshToken
- **Location in Doc:** Section 6.6

---

## 8. Code Structure (4 screenshots)

### Screenshot 20: Project Structure
- **Steps:**
  1. Open project in VS Code
  2. Expand all main folders
  3. Capture file explorer
- **Show:** api-gateway, auth-service, blog-service, frontend folders
- **Location in Doc:** Section 6.7

### Screenshot 21: Auth Service Code
- **File:** auth-service/src/main/java/com/blogsite/auth/web/AuthController.java
- **Show:** login() and refresh() methods
- **Location in Doc:** Section 6.7

### Screenshot 22: Blog Service Code
- **File:** blog-service/src/main/java/com/blogsite/blog/web/BlogController.java
- **Show:** CRUD methods (createBlog, getBlogs, updateBlog, deleteBlog)
- **Location in Doc:** Section 6.7

### Screenshot 23: Axios Interceptor
- **File:** frontend/src/services/apiClient.js
- **Show:** Response interceptor with token refresh logic
- **Location in Doc:** Section 6.7

---

## 9. Setup Script (1 screenshot)

### Screenshot 24: Running setup-and-run.bat
- **Steps:**
  1. Run setup-and-run.bat
  2. Capture terminal showing all services starting
- **Show:** Installation progress, service startup messages
- **Location in Doc:** Section 7.3

---

## 📝 Tips for Taking Screenshots

### Quality Guidelines
✅ Use high resolution (1920x1080 or higher)
✅ Ensure text is readable
✅ Crop unnecessary parts (taskbar, etc.)
✅ Use consistent window size
✅ Include relevant context (URL bar for web pages)

### Tools Recommended
- **Windows:** Snipping Tool (Win + Shift + S)
- **Mac:** Command + Shift + 4
- **Full Page:** Browser extensions like "Full Page Screen Capture"
- **Annotations:** Use built-in markup tools or Snagit

### Naming Convention
Save screenshots with descriptive names:
- `01_login_page.png`
- `02_registration_form.png`
- `03_home_blog_list.png`
- etc.

---

## 🔄 Workflow

1. ✅ Start all services (setup-and-run.bat)
2. ✅ Follow this guide in order
3. ✅ Save screenshots in a folder: `BlogSite_Screenshots/`
4. ✅ Open PROJECT_SUBMISSION.md in Word
5. ✅ Insert screenshots at marked locations
6. ✅ Add captions to each screenshot
7. ✅ Attach ZIP file
8. ✅ Review and submit

---

## 📋 Checklist

Track your progress:

- [ ] Architecture Diagram
- [ ] JWT Flow Diagram
- [ ] Login Page
- [ ] Registration Page
- [ ] Home Page - Blog List
- [ ] Create New Blog
- [ ] Blog Detail View
- [ ] Edit Blog
- [ ] Category Filter
- [ ] Mobile View
- [ ] Toast Notification
- [ ] Loading State
- [ ] API Gateway Console
- [ ] Auth Service Console
- [ ] Blog Service Console
- [ ] MySQL Databases
- [ ] Login API (Postman)
- [ ] Create Blog API (Postman)
- [ ] Token Refresh API (Postman)
- [ ] Project Structure
- [ ] Auth Service Code
- [ ] Blog Service Code
- [ ] Axios Interceptor Code
- [ ] Setup Script Running

**Total: 24 screenshots**

---

Good luck with your submission! 🎓
