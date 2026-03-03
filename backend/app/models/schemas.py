from pydantic import BaseModel


class Guideline(BaseModel):
    id: str
    title: str
    source: str  # e.g. "Material Design", "WCAG", "Nielsen Norman"
    content: str
    relevance_score: float


class SimilarUI(BaseModel):
    id: str
    description: str
    image_url: str
    relevance_score: float


class AnalysisResult(BaseModel):
    feedback: str
    guidelines: list[Guideline]
    similar_uis: list[SimilarUI]
