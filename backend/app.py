from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from models import Expense, ExpenseCreate
from datetime import datetime

app = FastAPI()

# In-memory storage 
expenses_db: list[Expense] = []
expense_id_counter = 1

#Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite's default dev server port
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allows all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["Content-Type", "Authorization"],  # Allows The following headers
)

@app.get("/api/")
def read_root():
    return {"message": "Welcome to Expense Tracker API!"} 

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "Expense-Tracker-API"}

@app.get("/api/expenses/total")
def get_total_spent():
    total = sum(expense.amount for expense in expenses_db)
    return {"total": total, "currency": "NGN", "count": len(expenses_db)}

@app.post("/api/expenses/", response_model=Expense, status_code=201)
def create_expense(expense_data: ExpenseCreate):
    global expense_id_counter

    #create the expense with server-generated fields
    new_expense = Expense(
        id = expense_id_counter,
        amount = expense_data.amount,
        category = expense_data.category,
        description = expense_data.description,
        created_at = datetime.now()
    )

    expenses_db.append(new_expense)
    expense_id_counter += 1

    return new_expense

@app.get("/api/expenses/", response_model=list[Expense])
def get_all_expenses():
    return expenses_db

@app.get("/api/expenses/{expense_id}", response_model=Expense)
def get_expense_by_id(expense_id: int):
    # Search for the expense in our list
    for expense in expenses_db:
        if expense.id == expense_id:
            return expense
    
    # If not found, raise 404 error
    raise HTTPException(status_code=404, detail=f"Expense with id {expense_id} not found")

@app.put("/api/expenses/{expense_id}", response_model=Expense)
def update_expense_by_id(expense_id: int, updated_expense: ExpenseCreate):
    # Search for the expense in our list
    for index, expense in enumerate(expenses_db):
        if expense.id == expense_id:
            # IMPORTANT: 'updated_expense' (parameter) shadows 'expense' (loop var) in the variable name below
            # The Expense() constructor uses 'updated_expense' for new data, 'expense' for old data
            # Keep original id and created_at, but update amount, category, and description
            updated_expense = Expense(
                id=expense.id,                          # Keep original ID (never changes)
                amount=updated_expense.amount,          # New amount from request body
                category=updated_expense.category,      # New category from request body
                description=updated_expense.description,  # New description from request body
                created_at=expense.created_at           # Keep original creation timestamp
            )
            expenses_db[index] = updated_expense
            return updated_expense
    
    # If not found, raise 404 error
    raise HTTPException(status_code=404, detail=f"Expense with id {expense_id} not found")
    

@app.delete("/api/expenses/{expense_id}", status_code=204)
def delete_expense_by_id(expense_id: int):
    # search for the expense by ID
    for index, expense in enumerate(expenses_db):
        if expense.id == expense_id:
            # Remove the expense from the list
            expenses_db.pop(index)
            return Response(status_code=204)
        
    # If not found, raise 404 error
    raise HTTPException(status_code=404, detail=f"Expense with id {expense_id} not found")


