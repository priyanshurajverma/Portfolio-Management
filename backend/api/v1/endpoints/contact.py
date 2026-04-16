from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from api import deps
from db.models.contact import ContactLead
from pydantic import BaseModel, EmailStr
from typing import List
from core.config import settings
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import BaseModel, EmailStr

router = APIRouter()

class ContactBase(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactResponse(BaseModel):
    status: str
    id: int

conf = None
if settings.MAIL_USERNAME and settings.MAIL_FROM:
    conf = ConnectionConfig(
        MAIL_USERNAME=settings.MAIL_USERNAME,
        MAIL_PASSWORD=settings.MAIL_PASSWORD,
        MAIL_FROM=settings.MAIL_FROM,
        MAIL_PORT=settings.MAIL_PORT,
        MAIL_SERVER=settings.MAIL_SERVER,
        MAIL_STARTTLS=settings.MAIL_TLS,
        MAIL_SSL_TLS=settings.MAIL_SSL,
        USE_CREDENTIALS=True,
        VALIDATE_CERTS=True
    )

async def send_email_async(subject: str, email_to: str, body: dict):
    if not conf:
        print("Email config missing, skipping email send.")
        return
    message = MessageSchema(
        subject=subject,
        recipients=[email_to],
        body=body,
        subtype=MessageType.html
    )
    fm = FastMail(conf)
    await fm.send_message(message)

# Background Task Wrapper
def send_notification(name: str, email: str, message: str):
    # This would actually send to the ADMIN
    # For now we just print if no creds
    if not settings.MAIL_USERNAME:
        print(f"MOCK EMAIL: New Lead from {name} ({email}): {message}")
        return

    # To implement actual sending we need async context or run_in_executor if synchronous
    # But FastMail is async.
    # We will skip actual verify here to avoid crashing if config is invalid.
    pass

@router.post("/submit", response_model=ContactResponse)
def submit_contact(contact: ContactBase, background_tasks: BackgroundTasks, db: Session = Depends(deps.get_db)):
    lead = ContactLead(name=contact.name, email=contact.email, message=contact.message)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    
    background_tasks.add_task(send_notification, contact.name, contact.email, contact.message)
    
    return {"status": "success", "id": lead.id}

@router.get("/admin/leads")
def get_leads(skip: int = 0, limit: int = 100, db: Session = Depends(deps.get_db), current_user = Depends(deps.get_current_admin)):
    leads = db.query(ContactLead).order_by(ContactLead.created_at.desc()).offset(skip).limit(limit).all()
    return leads
