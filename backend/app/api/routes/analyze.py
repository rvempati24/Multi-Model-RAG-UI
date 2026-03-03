from fastapi import APIRouter, UploadFile, File, HTTPException

from app.models.schemas import AnalysisResult, Guideline, SimilarUI

router = APIRouter()


@router.post("/analyze", response_model=AnalysisResult)
async def analyze_screenshot(file: UploadFile = File(...)):
    """
    Accepts a UI screenshot and returns design feedback, relevant guidelines,
    and visually similar well-designed UI examples.

    Pipeline (to be implemented):
      1. Embed the uploaded image with CLIP/SigLIP
      2. Query Pinecone for dot product (text + image chunks)
      3. Feed retrieved context + screenshot into Claude for synthesis
    """
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    # --- Placeholder response ---
    return AnalysisResult(
        feedback=(
            "Placeholder: LLM-synthesized feedback will appear here once the "
            "RAG pipeline is connected."
        ),
        guidelines=[
            Guideline(
                id="placeholder-1",
                title="Touch Target Size",
                source="Material Design",
                content="Interactive elements should be at least 48x48 dp to ensure accessibility.",
                relevance_score=0.91,
            ),
            Guideline(
                id="placeholder-2",
                title="Colour Contrast (AA)",
                source="WCAG 2.1",
                content="Text must have a contrast ratio of at least 4.5:1 against its background.",
                relevance_score=0.87,
            ),
        ],
        similar_uis=[
            SimilarUI(
                id="placeholder-ui-1",
                description="Placeholder: similar UI example will be retrieved from the knowledge base.",
                image_url="",
                relevance_score=0.88,
            ),
        ],
    )
