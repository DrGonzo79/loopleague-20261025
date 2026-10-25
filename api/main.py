from typing import Literal
from fastapi import FastAPI
from pydantic import BaseModel, Field, HttpUrl

app = FastAPI(title="LoopLeague verification API", version="0.1.0")

class Submission(BaseModel):
    id: str
    school: str = Field(min_length=3, max_length=100)
    region: str = Field(min_length=2, max_length=40)
    video_url: HttpUrl
    views: int = Field(ge=0)
    completion: float = Field(ge=0, le=100)
    faculty_verified: bool
    consent_complete: bool

class Ranked(BaseModel):
    id: str
    school: str
    score: int
    status: Literal["ready", "hold"]
    blocker: str | None

def evaluate(item: Submission) -> Ranked:
    blocker = None
    if not item.faculty_verified:
        blocker = "Faculty verification required"
    elif not item.consent_complete:
        blocker = "Guardian consent incomplete"
    score = 0 if blocker else round(min(item.views / 25, 60) + min(item.completion * .4, 40))
    return Ranked(id=item.id, school=item.school, score=score, status="hold" if blocker else "ready", blocker=blocker)

@app.get("/health")
def health(): return {"status":"ok"}

@app.post("/rank", response_model=list[Ranked])
def rank(items: list[Submission]):
    return sorted((evaluate(i) for i in items), key=lambda x: x.score, reverse=True)
