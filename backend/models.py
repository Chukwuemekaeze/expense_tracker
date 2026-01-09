from pydantic import BaseModel, Field
from datetime import datetime

class ExpenseBase(BaseModel):
    amount: float = Field(..., gt=0, description="Expense amount must be greater than 0")
    category: str = Field(..., min_length=1, description="Category cannot be empty")
    description: str = Field(..., min_length=1, description="Description cannot be empty")

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True