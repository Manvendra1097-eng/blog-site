const { createCanvas } = require("canvas");
const fs = require("fs");

// Canvas dimensions
const width = 1200;
const height = 1000;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Colors
const colors = {
    frontend: "#3498db",
    gateway: "#e67e22",
    auth: "#2ecc71",
    blog: "#9b59b6",
    database: "#7f8c8d",
    text: "#2c3e50",
    arrow: "#34495e",
    background: "#ffffff",
};

// Draw background
ctx.fillStyle = colors.background;
ctx.fillRect(0, 0, width, height);

// Helper function to draw rounded rectangle
function drawRoundedRect(x, y, w, h, r, fillColor, text, subtext = []) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x + w / 2, y + 30);

    // Draw subtext
    ctx.font = "14px Arial";
    subtext.forEach((line, i) => {
        ctx.fillText(line, x + w / 2, y + 55 + i * 20);
    });
}

// Helper function to draw database cylinder
function drawDatabase(x, y, w, h, fillColor, text, subtext = []) {
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    const ellipseH = 20;

    // Top ellipse
    ctx.beginPath();
    ctx.ellipse(
        x + w / 2,
        y + ellipseH / 2,
        w / 2,
        ellipseH / 2,
        0,
        0,
        Math.PI * 2,
    );
    ctx.fill();
    ctx.stroke();

    // Rectangle body
    ctx.fillRect(x, y + ellipseH / 2, w, h - ellipseH);
    ctx.strokeRect(x, y + ellipseH / 2, w, h - ellipseH);

    // Bottom ellipse
    ctx.beginPath();
    ctx.ellipse(
        x + w / 2,
        y + h - ellipseH / 2,
        w / 2,
        ellipseH / 2,
        0,
        0,
        Math.PI * 2,
    );
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, x + w / 2, y + h / 2);

    ctx.font = "12px Arial";
    subtext.forEach((line, i) => {
        ctx.fillText(line, x + w / 2, y + h / 2 + 20 + i * 18);
    });
}

// Helper function to draw arrow
function drawArrow(fromX, fromY, toX, toY, label = "") {
    ctx.strokeStyle = colors.arrow;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    // Draw line
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Draw arrowhead
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowLength = 15;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowLength * Math.cos(angle - Math.PI / 6),
        toY - arrowLength * Math.sin(angle - Math.PI / 6),
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - arrowLength * Math.cos(angle + Math.PI / 6),
        toY - arrowLength * Math.sin(angle + Math.PI / 6),
    );
    ctx.stroke();

    // Draw label
    if (label) {
        ctx.fillStyle = colors.text;
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;
        ctx.fillText(label, midX + 30, midY - 5);
    }
}

// Draw title
ctx.fillStyle = colors.text;
ctx.font = "bold 28px Arial";
ctx.textAlign = "center";
ctx.fillText("BlogSite Microservices Architecture", width / 2, 40);

// Draw components
// Browser
drawRoundedRect(475, 80, 250, 60, 10, colors.frontend, "Browser", [
    "localhost:5173",
]);

// Frontend
drawRoundedRect(
    425,
    180,
    350,
    100,
    10,
    colors.frontend,
    "Frontend (React + Vite)",
    ["Port: 5173", "Axios Interceptor", "Login/Blog UI"],
);

// API Gateway
drawRoundedRect(425, 330, 350, 120, 10, colors.gateway, "API Gateway", [
    "Spring Cloud Gateway - Port: 8080",
    "JWT Validation • Routing",
    "CORS • Header Enrichment",
]);

// Auth Service
drawRoundedRect(100, 520, 250, 120, 10, colors.auth, "Auth Service", [
    "Spring Boot - Port: 8081",
    "Registration • Login",
    "JWT Tokens • Refresh",
]);

// Blog Service
drawRoundedRect(850, 520, 250, 120, 10, colors.blog, "Blog Service", [
    "Spring Boot - Port: 8082",
    "Blog CRUD • Categories",
    "Author Authorization",
]);

// Databases
drawDatabase(100, 720, 200, 140, colors.database, "MySQL", [
    "blog_auth",
    "• users",
    "• roles",
]);
drawDatabase(900, 720, 200, 140, colors.database, "MySQL", [
    "blog_content",
    "• blogs",
    "• categories",
]);

// Draw arrows
drawArrow(600, 140, 600, 180, "HTTP");
drawArrow(600, 280, 600, 330, "REST API\n(JWT)");
drawArrow(500, 450, 250, 520, "/auth/**");
drawArrow(700, 450, 950, 520, "/blogs/**");
drawArrow(200, 640, 200, 720, "JPA/JDBC");
drawArrow(975, 640, 1000, 720, "JPA/JDBC");

// Add port labels
ctx.fillStyle = colors.text;
ctx.font = "11px Arial";
ctx.textAlign = "left";
ctx.fillText("Port: 3306", 110, 860);
ctx.fillText("Port: 3306", 910, 860);

// Save to file
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("architecture_diagram.png", buffer);
console.log("✓ Diagram generated: architecture_diagram.png");
