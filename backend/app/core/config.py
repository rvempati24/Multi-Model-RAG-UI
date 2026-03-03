import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # API keys (set via environment variables)
    gemini_api_key: str = os.environ["GEMINI_API_KEY"]
    pinecone_api_key: str = os.environ["PINECONE_API_KEY"]
    pinecone_index_name: str = "multi-modal-rag"

    # Embedding model
    clip_model_name: str = "openai/clip-vit-base-patch32"

    class Config:
        env_file = ".env"


settings = Settings()
