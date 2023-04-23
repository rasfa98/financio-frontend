import { Expense } from './Expense';

export interface Budget {
  id?: number;
  name: string;
  amount: number;
  expenses: Expense[];
}
