from sqlalchemy.orm import Session
from db.session import SessionLocal
from db.models.blog import Blog
from datetime import datetime

def seed_blog():
    db: Session = SessionLocal()
    
    # Check if blog already exists
    existing = db.query(Blog).filter(Blog.slug == "building-scalable-web-apps-nextjs-fastapi").first()
    if existing:
        print("Blog post already exists.")
        return

    blog_content = """
## The Modern Stack: Next.js + FastAPI

In the evolving landscape of web development, the choice between monoliths and microservices often leads us to a middle ground: **The Composable Architecture**. 

As a Full Stack Engineer, I've found that combining the server-side rendering power of **Next.js** with the high-performance asynchronous capabilities of **FastAPI (Python)** creates a robust foundation for scalable applications.

### Why Next.js?
React has won the frontend war, but Next.js won the framework war. It provides:
- **SEO out of the box**: Critical for public-facing portfolios and e-commerce sites.
- **Server Components**: We can fetch data on the server, reducing the client-side JavaScript bundle.
- **Routing**: File-system based routing is intuitive and powerful.

### Why FastAPI?
Python is the language of AI and Data Science. By using FastAPI for the backend, we get:
- **Type Safety**: Pydantic models ensure our API contracts are valid.
- **Async/Await**: Handling thousands of concurrent connections (like in my Chatbot project) is a breeze.
- **AI Integration**: Since most ML libraries (TensorFlow, PyTorch, Gemini) are native to Python, integrating AI features becomes seamless.

### Real World Application: Warehouse Management
I'm currently applying this stack to build a **Warehouse Management System (WMS)**. The complexity of inventory tracking requires a solid backend (FastAPI + SQL), while the dashboard needs a snappy, reactive UI (Next.js + Tailwind).

This portfolio itself is built on this stack! It features a custom Admin Dashboard, JWT Authentication, and a Glassmorphism UI design.

### Conclusion
If you're starting a new project in 2026, consider this duo. It separates concerns perfectly while leveraging the best ecosystems in both JavaScript and Python worlds.
"""

    post = Blog(
        title="Building Scalable Web Apps with Next.js and FastAPI",
        slug="building-scalable-web-apps-nextjs-fastapi",
        content=blog_content,
        published=True,
        created_at=datetime.utcnow()
    )
    
    db.add(post)
    db.commit()
    print("Blog post created successfully!")

if __name__ == "__main__":
    seed_blog()
