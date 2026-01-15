export interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  created_at: string;
}

export interface ExpenseInput {
  amount: number;
  category: string;
  description: string;
}
