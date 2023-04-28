import { Expense } from './expense';

export interface Budget {
  id?: number;
  name: string;
  amount: number;
  expenses: Expense[];
}
