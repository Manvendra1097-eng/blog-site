# Architecture Diagram Generation Scripts

This folder contains code-based solutions to generate architecture diagrams programmatically.

## Method 1: PlantUML (Recommended - Best Quality)

### Prerequisites
```bash
# Install Java (already have for Spring Boot)
# Download PlantUML JAR
curl -L https://github.com/plantuml/plantuml/releases/download/v1.2024.8/plantuml-1.2024.8.jar -o plantuml.jar
```

### Generate Diagram
```bash
java -jar plantuml.jar architecture.puml
```

**Output:** `architecture.png` (high-quality, professional)

---

## Method 2: Mermaid.js

### Prerequisites
```bash
npm install -g @mermaid-js/mermaid-cli
```

### Generate Diagram
```bash
mmdc -i architecture.mmd -o architecture.png -w 1200 -H 1000 -b white
```

**Output:** `architecture.png`

### Alternative: Online Renderer
1. Go to https://mermaid.live/
2. Paste content from `architecture.mmd`
3. Download as PNG/SVG

---

## Method 3: Python Diagrams Library (Requires Python)

### Prerequisites
```bash
# Install Python library
pip install diagrams
# Install Graphviz
# Windows: choco install graphviz
# Or download from: https://graphviz.org/download/
```

### Generate Diagram
```bash
python generate_diagram.py
```

**Output:** `architecture_diagram.png`

---

## Method 4: Node.js Canvas (Custom Drawing)

### Prerequisites
```bash
cd diagrams
npm install canvas
```

### Generate Diagram
```bash
node generate_diagram.js
```

**Output:** `architecture_diagram.png`

---

## Quick Comparison

| Method | Quality | Customization | Setup Difficulty | Best For |
|--------|---------|---------------|------------------|----------|
| PlantUML | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Easy (Java only) | Professional docs |
| Mermaid | ⭐⭐⭐⭐ | ⭐⭐⭐ | Easy (npm) | Quick diagrams |
| Python Diagrams | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Medium | Cloud architectures |
| Node.js Canvas | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Medium | Full control |

---

## Recommended Workflow

### For Your Submission:
1. **Use PlantUML** (best quality, already have Java)
2. Generate: `java -jar plantuml.jar architecture.puml`
3. Output: High-quality PNG ready for Word doc

### If PlantUML not working:
1. Use Mermaid Live Editor (no installation needed)
2. Copy content from `architecture.mmd`
3. Paste at https://mermaid.live/
4. Download PNG

---

## Files in This Folder

- `architecture.puml` - PlantUML source code
- `architecture.mmd` - Mermaid.js source code
- `generate_diagram.py` - Python script
- `generate_diagram.js` - Node.js script
- `README.md` - This file

---

## Need Help?

If none work, the ASCII diagram in ARCHITECTURE_DIAGRAM.md is actually quite professional and can be used directly in your Word document with monospace font (Consolas, Courier New).
