from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.client import User
from diagrams.programming.framework import React
from diagrams.onprem.network import Nginx
from diagrams.programming.language import Java
from diagrams.onprem.database import MySQL

# Graph attributes
graph_attr = {
    "fontsize": "16",
    "bgcolor": "white",
    "pad": "0.5",
}

node_attr = {
    "fontsize": "12",
}

edge_attr = {
    "fontsize": "10",
}

with Diagram("BlogSite Microservices Architecture",
             filename="architecture_diagram",
             show=False,
             direction="TB",
             graph_attr=graph_attr,
             node_attr=node_attr,
             edge_attr=edge_attr):

    user = User("Browser\nlocalhost:5173")

    with Cluster("Frontend Layer"):
        frontend = React("React + Vite\nPort: 5173\n• Login/Register\n• Blog UI\n• Axios Interceptor")

    with Cluster("API Gateway Layer"):
        gateway = Nginx("API Gateway\nPort: 8080\n• JWT Validation\n• Routing\n• CORS")

    with Cluster("Microservices"):
        with Cluster("Auth Service (8081)"):
            auth = Java("Spring Boot\n• Registration\n• Login\n• JWT Tokens\n• Token Refresh")

        with Cluster("Blog Service (8082)"):
            blog = Java("Spring Boot\n• Blog CRUD\n• Categories\n• Authorization")

    with Cluster("Database Layer"):
        db_auth = MySQL("blog_auth\n• users\n• roles")
        db_blog = MySQL("blog_content\n• blogs\n• categories")

    # Connections
    user >> Edge(label="HTTP/HTTPS") >> frontend
    frontend >> Edge(label="REST API\nJWT Bearer") >> gateway
    gateway >> Edge(label="/auth/**") >> auth
    gateway >> Edge(label="/blogs/**\n/categories") >> blog
    auth >> Edge(label="JPA/Hibernate") >> db_auth
    blog >> Edge(label="JPA/Hibernate") >> db_blog
