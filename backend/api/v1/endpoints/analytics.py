from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from api import deps
from db.models.analytics import Visitor, PageView, ResumeDownload
from db.models.contact import ContactLead
from typing import Optional
from pydantic import BaseModel

router = APIRouter()

class VisitRequest(BaseModel):
    path: str

class TrackResponse(BaseModel):
    status: str
    visitor_id: int

@router.post("/visit", response_model=TrackResponse)
def track_visit(visit: VisitRequest, request: Request, db: Session = Depends(deps.get_db)):
    ip = request.client.host
    ua = request.headers.get("user-agent", "")
    ip_hash = str(hash(f"{ip}-{ua}-{request.headers.get('accept-language', '')}")) # Simple hash

    visitor = db.query(Visitor).filter(Visitor.ip_hash == ip_hash).first()
    if not visitor:
        visitor = Visitor(ip_hash=ip_hash, user_agent=ua)
        db.add(visitor)
        db.commit()
        db.refresh(visitor)
    
    # Track initial page view implicitly or let separate call do it?
    # Let's do separate call to keep logic clean, but return visitor_id
    
    return {"status": "ok", "visitor_id": visitor.id}

class PageViewRequest(BaseModel):
    visitor_id: int
    path: str

@router.post("/page-view")
def track_page_view(pv_req: PageViewRequest, db: Session = Depends(deps.get_db)):
    pv = PageView(visitor_id=pv_req.visitor_id, path=pv_req.path)
    db.add(pv)
    db.commit()
    return {"status": "ok"}

class ResumeRequest(BaseModel):
    visitor_id: int
    page_source: str

@router.post("/resume-download")
def track_resume_download(req: ResumeRequest, db: Session = Depends(deps.get_db)):
    rd = ResumeDownload(visitor_id=req.visitor_id, page_source=req.page_source)
    db.add(rd)
    db.commit()
    return {"status": "ok"}

@router.get("/summary")
def get_analytics_summary(db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_admin)):
    total_visitors = db.query(Visitor).count()
    total_page_views = db.query(PageView).count()
    resume_downloads = db.query(ResumeDownload).count()
    
    # Group by Page
    pages = db.query(PageView.path, func.count(PageView.path)).group_by(PageView.path).all()
    page_stats = [{"path": p[0], "views": p[1]} for p in pages]

    # Recent Leads
    recent_leads = db.query(ContactLead).order_by(ContactLead.created_at.desc()).limit(5).all()
    
    return {
        "visitors": total_visitors,
        "page_views": total_page_views,
        "resume_downloads": resume_downloads,
        "page_stats": page_stats,
        "recent_leads": recent_leads
    }
