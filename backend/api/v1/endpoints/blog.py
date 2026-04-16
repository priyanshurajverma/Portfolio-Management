from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from api import deps
from db.models.blog import Blog
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class BlogBase(BaseModel):
    title: str
    slug: str
    content: str
    published: bool = False

class BlogCreate(BlogBase):
    pass

class BlogUpdate(BlogBase):
    pass

class BlogResponse(BlogBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

@router.get("/", response_model=List[BlogResponse])
def read_blogs(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db)):
    blogs = db.query(Blog).filter(Blog.published == True).offset(skip).limit(limit).all()
    return blogs

@router.get("/{slug}", response_model=BlogResponse)
def read_blog(slug: str, db: Session = Depends(deps.get_db)):
    blog = db.query(Blog).filter(Blog.slug == slug, Blog.published == True).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog

# Admin Endpoints

@router.post("/", response_model=BlogResponse)
def create_blog(blog: BlogCreate, db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_admin)):
    db_blog = Blog(**blog.dict())
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog

@router.put("/{id}", response_model=BlogResponse)
def update_blog(id: int, blog: BlogUpdate, db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_admin)):
    db_blog = db.query(Blog).filter(Blog.id == id).first()
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    for key, value in blog.dict().items():
        setattr(db_blog, key, value)
    
    db.commit()
    db.refresh(db_blog)
    return db_blog

@router.delete("/{id}")
def delete_blog(id: int, db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_admin)):
    db_blog = db.query(Blog).filter(Blog.id == id).first()
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(db_blog)
    db.commit()
    return {"status": "success"}

@router.get("/admin/all", response_model=List[BlogResponse])
def read_all_blogs_admin(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_admin)):
    blogs = db.query(Blog).offset(skip).limit(limit).all()
    return blogs
