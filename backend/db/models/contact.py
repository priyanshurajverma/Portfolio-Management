from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from db.session import Base

class ContactLead(Base):
    __tablename__ = "contact_leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, index=True)
    message = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Interaction(Base):
    __tablename__ = "interactions"
    
    id = Column(Integer, primary_key=True, index=True)
    visitor_id = Column(Integer, ForeignKey("visitors.id"))
    type = Column(String) # copy_email, social_click, etc.
    details = Column(String, nullable=True) # JSON string or specific detail
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    visitor = relationship("Visitor") # Use string reference if circle import issue, but safe here if Analytics imported
