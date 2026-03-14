"""
One-time script to create the Pinecone index.
Run from the backend/ directory:

    python scripts/create_index.py

Safe to re-run — skips creation if the index already exists.
"""

import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from pinecone import Pinecone, ServerlessSpec

from app.core.config import settings

# UIClip is CLIP ViT-B/32 — 512-dim output vectors.
# Do NOT change this without re-embedding the entire knowledge base.
EMBEDDING_DIM = 512


def create_index() -> None:
    pc = Pinecone(api_key=settings.pinecone_api_key)

    existing = [idx.name for idx in pc.list_indexes()]
    if settings.pinecone_index_name in existing:
        print(f"Index '{settings.pinecone_index_name}' already exists — skipping.")
        return

    print(f"Creating index '{settings.pinecone_index_name}' ({EMBEDDING_DIM}-dim, cosine)...")
    pc.create_index(
        name=settings.pinecone_index_name,
        dimension=EMBEDDING_DIM,
        metric="cosine",
        # ServerlessSpec is for new Pinecone accounts.
        # Pod-based accounts: replace with PodSpec(environment=settings.pinecone_environment)
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )
    print("Done.")
    print(f"Namespaces '{settings.guidelines_namespace}' and "
          f"'{settings.ui_examples_namespace}' will be created automatically "
          "on first upsert.")


if __name__ == "__main__":
    create_index()
