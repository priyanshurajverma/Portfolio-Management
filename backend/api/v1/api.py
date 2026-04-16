from fastapi import APIRouter
from api.v1.endpoints import auth, analytics, blog, contact, chat

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(blog.router, prefix="/blogs", tags=["blogs"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
