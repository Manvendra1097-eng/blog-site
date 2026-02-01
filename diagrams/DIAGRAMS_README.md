# Diagram Generation - Complete Set

This folder contains PlantUML code for all project diagrams.

## Available Diagrams

### 1. Architecture Diagram
**File:** `architecture.puml`
**Output:** `architecture.png`
**Shows:** Complete microservices architecture with all components, databases, and connections
**Use in:** Section 2 - System Architecture

### 2. JWT Authentication Flow
**File:** `jwt_flow.puml`
**Output:** `jwt_flow.png`
**Shows:**
- User registration
- Login and token generation
- Authenticated API requests
- Token expiration handling
- Automatic token refresh
- Session expiration

**Use in:** Section 5.1 - JWT Authentication Flow

### 3. API Gateway Request Flow
**File:** `gateway_flow.puml`
**Output:** `gateway_flow.png`
**Shows:**
- CORS validation
- JWT validation in gateway
- Request routing logic
- Header enrichment
- Service communication
- Error scenarios (503, 403, 400)

**Use in:** Section 5.2 - API Gateway Request Flow

### 4. Token Refresh Flow (Axios Interceptor)
**File:** `token_refresh_flow.puml`
**Output:** `token_refresh_flow.png`
**Shows:**
- Axios interceptor in action
- Automatic token refresh on 401
- localStorage token management
- Request retry logic
- Session expiration handling

**Use in:** Section 5.1 - Automatic Token Refresh (subsection)

---

## Generate All Diagrams

### One Command:
```bash
generate.bat
```

This will:
1. Download PlantUML if needed
2. Generate all 4 diagrams
3. Open them for preview
4. Ready to insert in Word document

### Manual Generation:
```bash
java -jar plantuml.jar architecture.puml
java -jar plantuml.jar jwt_flow.puml
java -jar plantuml.jar gateway_flow.puml
java -jar plantuml.jar token_refresh_flow.puml
```

---

## Diagram Mapping for Word Document

| Diagram | Insert Location | Caption |
|---------|----------------|---------|
| architecture.png | Section 2 | Figure 1: BlogSite Microservices Architecture |
| jwt_flow.png | Section 5.1 | Figure 2: JWT Authentication and Refresh Flow |
| gateway_flow.png | Section 5.2 | Figure 3: API Gateway Request Processing Flow |
| token_refresh_flow.png | Section 5.1 | Figure 4: Automatic Token Refresh with Axios Interceptor |

---

## Customizing Diagrams

To modify diagrams:
1. Edit the `.puml` file
2. Run `generate.bat` again
3. New PNG will be generated

### PlantUML Syntax Reference:
- `->` : Solid arrow (request)
- `-->` : Dashed arrow (response)
- `note right/left of` : Add explanatory notes
- `alt/else/end` : Conditional flows
- `group` : Error scenarios
- `box` : Visual grouping

---

## Output Files

After running `generate.bat`, you'll have:
- ✅ `architecture.png` (~150KB)
- ✅ `jwt_flow.png` (~200KB)
- ✅ `gateway_flow.png` (~220KB)
- ✅ `token_refresh_flow.png` (~180KB)

All in high-resolution, ready for professional documentation.

---

## Troubleshooting

### Java not found
Make sure Java is installed and in PATH:
```bash
java -version
```

### Diagram not generated
Check if PlantUML JAR exists:
```bash
dir plantuml.jar
```

### Poor quality output
PlantUML generates high-quality PNG by default. If you need higher resolution:
```bash
java -jar plantuml.jar -DPLANTUML_LIMIT_SIZE=8192 architecture.puml
```

---

Ready to generate professional diagrams for your submission! 🎨
