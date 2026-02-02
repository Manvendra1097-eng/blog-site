# BlogSite Frontend

React 19 + Vite frontend for the BlogSite microservices platform.

## Tech Stack
- React 19.2.0
- Vite 7.3.1
- React Router v6
- React Hook Form + Zod validation
- Tailwind CSS 4.1.18
- Axios 1.13.4 (with automatic token refresh)
- Lucide React (icons)
- shadcn/ui components
- Sonner (toast notifications)

## Features
- ✅ JWT authentication with automatic token refresh
- ✅ Blog CRUD operations with dedicated pages
- ✅ Category filtering and search
- ✅ Pagination (9 blogs per page)
- ✅ Form validation with React Hook Form + Zod
- ✅ Error Boundary for graceful error handling
- ✅ 404 Not Found page
- ✅ Responsive design
- ✅ Toast notifications (top-right, 3-4s duration)
- ✅ Performance optimizations (React.memo, useMemo)
- ✅ Centralized localStorage management
- ✅ Environment variables support

## Running Locally

### Prerequisites
- Node.js 18+
- Backend services running on port 8080

### Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Server runs on http://localhost:5173

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE=http://localhost:8080
```

## Default Credentials

Admin account:
- Username: `admin`
- Password: `Admin1234`

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui base components
│   ├── auth/         # Authentication components
│   ├── blog/         # Blog-specific components
│   ├── common/       # Common components
│   └── layout/       # Layout components
├── hooks/            # Custom React hooks
├── pages/            # Page components (routing)
├── services/         # API service layer
├── lib/              # Utilities and helpers
├── routes/           # Route configuration
└── config/           # App configuration
```

## Key Routes

- `/login` - Login/Register page
- `/` - Home page with blog listing
- `/blog/create` - Create new blog (full-screen editor)
- `/blog/:id` - View blog detail
- `/blog/:id/edit` - Edit blog (full-screen editor)
- `*` - 404 Not Found page

## API Configuration
Backend API: http://localhost:8080 (API Gateway)

## Recent Improvements

### Security
- ✅ Removed hardcoded credentials
- ✅ Centralized localStorage with error handling
- ✅ Environment variables for API URLs

### Architecture
- ✅ Converted modals to dedicated pages for better UX
- ✅ Added Error Boundary
- ✅ Added 404 page
- ✅ Refactored LoginPage with React Hook Form

### UX/Performance
- ✅ Pagination (9 blogs/page)
- ✅ Toast position (top-right) and duration (3-4s)
- ✅ React.memo for BlogCard and BlogGrid
- ✅ useMemo for paginated blogs
- ✅ Unsaved changes warning on blog creation/editing

### Code Quality
- ✅ Consistent validation schemas with Zod
- ✅ Custom hooks for better code organization
- ✅ Centralized toast configuration
