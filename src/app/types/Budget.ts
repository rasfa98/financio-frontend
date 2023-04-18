export interface Budget {
  id: number;
  name: string;
  amount: number;
}

export interface CreateBudgetRequest {
  name: string;
  amount: number;
}

export interface UpdateBudgetRequest {
  id: number;
  name: string;
  amount: number;
}
