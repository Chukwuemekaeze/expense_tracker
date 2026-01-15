import type { Expense, ExpenseInput } from "../types/expense";

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Fetch all expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

// Fetch total expenses
export const fetchTotal = async (): Promise<{
  total: number;
  currency: string;
  count: number;
}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/total`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching total:", error);
    throw error;
  }
};

// Create new expense
export const createExpense = async (
  expenseInput: ExpenseInput
): Promise<Expense> => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseInput),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating expense:", error);
    throw error;
  }
};

// Fetch single expense by ID
export const fetchExpenseById = async (id: number): Promise<Expense> => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error;
  }
};

// Update expense
export const updateExpense = async (
  id: number,
  expenseInput: ExpenseInput
): Promise<Expense> => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseInput),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

// Delete expense
export const deleteExpense = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};
