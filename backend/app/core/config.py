from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # API keys — required, no defaults (fail fast if missing)
    anthropic_api_key: str
    pinecone_api_key: str

    # Pinecone
    pinecone_index_name: str = "multi-modal-rag-ui"
    pinecone_environment: str = "us-east-1-aws"
    guidelines_namespace: str = "guidelines"
    ui_examples_namespace: str = "ui_examples"

    # Embedding model
    uiclip_model_name: str = (
        "biglab/uiclip_jitteredwebsites-2-224-paraphrased_webpairs_humanpairs"
    )

    # Retrieval
    top_k_guidelines: int = 8
    top_k_ui_examples: int = 12

    # Reranking
    rerank_top_n: int = 5
    similarity_weight: float = 0.6
    quality_weight: float = 0.4

    # LLM
    claude_model: str = "claude-sonnet-4-6"
    claude_max_tokens: int = 1024

    # Image upload limit (bytes) — 5 MB
    max_image_bytes: int = 5 * 1024 * 1024


settings = Settings()
