from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import analyze, health

app = FastAPI(
    title="Multi-Modal RAG UI API",
    description="Backend for analyzing UI screenshots against a design knowledge base.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(analyze.router, prefix="/api", tags=["analyze"])
