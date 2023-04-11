import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Budget } from '../types/Budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient) {}

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${environment.apiUrl}/budgets`);
  }

  removeBudget(budget: Budget): Observable<Budget> {
    return this.http.delete<Budget>(
      `${environment.apiUrl}/budgets/${budget.id}`
    );
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${environment.apiUrl}/budgets`, budget);
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(
      `${environment.apiUrl}/budgets/${budget.id}`,
      budget
    );
  }
}
