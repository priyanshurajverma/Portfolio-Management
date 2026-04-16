from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.session import Base

class Visitor(Base):
    __tablename__ = "visitors"

    id = Column(Integer, primary_key=True, index=True)
    ip_hash = Column(String, index=True)
    user_agent = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    page_views = relationship("PageView", back_populates="visitor")
    resume_downloads = relationship("ResumeDownload", back_populates="visitor")
    interactions = relationship("Interaction", back_populates="visitor")

class PageView(Base):
    __tablename__ = "page_views"

    id = Column(Integer, primary_key=True, index=True)
    visitor_id = Column(Integer, ForeignKey("visitors.id"))
    path = Column(String, index=True)
    duration = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    visitor = relationship("Visitor", back_populates="page_views")

class ResumeDownload(Base):
    __tablename__ = "resume_downloads"
    
    id = Column(Integer, primary_key=True, index=True)
    visitor_id = Column(Integer, ForeignKey("visitors.id"))
    page_source = Column(String) # where they clicked from
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    visitor = relationship("Visitor", back_populates="resume_downloads")
