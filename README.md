# Personal Portfolio Platform

A production-ready, user-friendly, SEO-optimized personal portfolio platform with analytics, admin dashboard, and blog.

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, Shadcn UI, Recharts, Framer Motion
- **Backend**: Python (FastAPI), SQLAlchemy, Pydantic, JWT Auth
- **Database**: SQLite (Dev) / PostgreSQL (Prod)
- **Deployment**: Vercel (Frontend) + Render/Railway (Backend)

## Features

- **Public Portfolio**: Home, About, Skills, Projects, Contact, Resume
- **Blog**: Markdown-based CMS
- **Admin Dashboard**: Analytics, Leads, Interactions
- **AI Chatbot**: Context-aware assistant
- **Analytics**: Privacy-focused custom tracking

## Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```
"# Portfolio-Management" 
