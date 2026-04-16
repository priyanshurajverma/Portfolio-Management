import google.generativeai as genai
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from core.config import settings

router = APIRouter()

class ChatMessage(BaseModel):
    role: str # "user" or "model"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: List[ChatMessage] = []

class ChatResponse(BaseModel):
    response: str

# Initialize Gemini if key exists
if settings.GEMINI_API_KEY:
    genai.configure(api_key=settings.GEMINI_API_KEY)

SYSTEM_PROMPT = """
You are an AI assistant for a professional portfolio website. 
Your goal is to answer questions about the portfolio owner's skills, projects, and experience.
Be professional, concise, and helpful.
If you don't know an answer, suggest using the contact form.
"""

@router.post("/ask", response_model=ChatResponse)
async def ask_chat(req: ChatRequest):
    if not settings.GEMINI_API_KEY:
        return {"response": "I am a demo AI. Please configure my API Key to make me smart!"}

    try:
        model = genai.GenerativeModel('gemini-pro')
        
        # Construct chat history for context
        chat_history = []
        # Add system context implicitly by prepending to history or just sending as first message
        # Gemini API has specific history format or we can just send prompts.
        # Simple implementation:
        
        full_prompt = f"{SYSTEM_PROMPT}\n\n"
        for msg in req.history:
            full_prompt += f"{msg.role}: {msg.content}\n"
        
        full_prompt += f"user: {req.message}\nmodel:"
        
        response = model.generate_content(full_prompt)
        return {"response": response.text}
    except Exception as e:
        # Fallback
        print(f"AI Error: {e}")
        return {"response": "I'm having trouble thinking right now. Please try again later."}
