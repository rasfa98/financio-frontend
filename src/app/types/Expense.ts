export interface Expense {
  id: number;
  name: string;
  amount: number;
  budgetId: number;
}

export interface CreateExpenseRequest {
  name: string;
  amount: number;
  budgetId: number;
}
