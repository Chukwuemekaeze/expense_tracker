from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from datetime import datetime

app = FastAPI()

#Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite's default dev server port
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allows all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["Content-Type", "Authorization"],  # Allows The following headers
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Expense Tracker API!"} 

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Expense-Tracker-API"}

class ExpenseBase(BaseModel):
    amount: float = Field(..., gt=0, description="Expense amount, must be greater than 0")
    category: str = Field(..., min_length=1, max_length=50, description="Category cannot be empty") 
    description: str = Field(..., min_length=1, max_length=200, description="Description cannot be empty")

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True