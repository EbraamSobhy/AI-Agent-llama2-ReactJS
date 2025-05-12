from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx

app = FastAPI()

# CORS setup (allow all origins for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/generate"

class Message(BaseModel):
    message: str

@app.on_event("startup")
async def warm_up_model():
    """Optional: Send a dummy request on startup to keep the model warm."""
    payload = {
        "model": "llama2",
        "prompt": "Hello",
        "stream": False
    }
    async with httpx.AsyncClient() as client:
        try:
            await client.post(OLLAMA_URL, json=payload)
        except httpx.HTTPError:
            pass  # Don't crash on startup if model isn't ready

@app.post("/chat")
async def chat(data: Message):
    payload = {
        "model": "llama2",
        "prompt": data.message,
        "stream": False
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(OLLAMA_URL, json=payload)
            response.raise_for_status()
            result = response.json()
            return {"response": result.get("response", "No response")}
    except httpx.HTTPError as e:
        return {"error": str(e)}
