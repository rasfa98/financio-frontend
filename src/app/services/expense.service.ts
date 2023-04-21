import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateExpenseRequest, Expense } from '../types/Expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getExpenses(budgetId: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(
      `${environment.apiUrl}/expenses?budgetId=${budgetId}`
    );
  }

  removeExpense(expense: Expense): Observable<Expense> {
    return this.http.delete<Expense>(
      `${environment.apiUrl}/expenses/${expense.id}`
    );
  }

  createExpense(expense: CreateExpenseRequest): Observable<Expense> {
    return this.http.post<Expense>(`${environment.apiUrl}/expenses`, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(
      `${environment.apiUrl}/expenses/${expense.id}`,
      expense
    );
  }
}
