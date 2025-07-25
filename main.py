from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import os

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini API config
genai.configure(api_key="YOUR_GEMINI_API_KEY")
model = genai.GenerativeModel("models/gemini-2.5-pro")


@app.post("/chat")
async def chat_with_gemini(request: Request):
    data = await request.json()
    prompt = data.get("message", "")

    if not prompt:
        return {"error": "Empty message"}

    response = model.generate_content(prompt)
    return {"response": response.text}
