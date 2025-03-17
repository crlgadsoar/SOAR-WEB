from fastapi import FastAPI, HTTPException
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Change to your React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname="soar_db",
    user="rajat",
    password="crlgad@123",
    host="localhost",
    port="5432"
)
cursor = conn.cursor(cursor_factory=RealDictCursor)

# Endpoint to fetch all incidents
@app.get("/incidents")
def get_incidents():
    cursor.execute("SELECT * FROM input;")
    incidents = cursor.fetchall()
    return {"incidents": incidents}

# Endpoint to trigger a playbook
@app.post("/trigger-playbook/{incident_id}")
def trigger_playbook(incident_id: int):
    cursor.execute("SELECT playbookid FROM input WHERE incidentid = %s;", (incident_id,))
    playbook = cursor.fetchone()
    if not playbook:
        raise HTTPException(status_code=404, detail="Incident not found")
    
    # Here, you should call your existing Python function to trigger the playbook
    # Example: trigger_playbook_function(playbook['playbookid'])

    return {"message": f"Playbook {playbook['playbookid']} triggered successfully"}
