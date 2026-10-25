from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)
BASE = {"id":"x1","school":"Harbor High","region":"North","video_url":"https://example.com/video","views":1000,"completion":90,"faculty_verified":True,"consent_complete":True}

def test_health(): assert client.get("/health").json() == {"status":"ok"}
def test_rank_and_hold():
    held = {**BASE,"id":"x2","school":"Lake High","faculty_verified":False,"views":9000}
    data = client.post("/rank", json=[held,BASE]).json()
    assert data[0]["id"] == "x1" and data[0]["score"] == 76
    assert data[1]["status"] == "hold" and data[1]["blocker"] == "Faculty verification required"
def test_invalid_completion():
    response=client.post("/rank",json=[{**BASE,"completion":101}])
    assert response.status_code == 422
def test_invalid_url():
    response=client.post("/rank",json=[{**BASE,"video_url":"not-a-url"}])
    assert response.status_code == 422
