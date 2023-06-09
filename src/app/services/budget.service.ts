import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Budget } from '../interfaces/budget';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient) {}

  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${environment.apiUrl}/budgets`);
  }

  getBudget(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${environment.apiUrl}/budgets/${id}`);
  }

  removeBudget(budget: Budget): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/budgets/${budget.id}`);
  }

  createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${environment.apiUrl}/budgets`, budget);
  }

  updateBudget(budget: Budget): Observable<void> {
    return this.http.put<void>(
      `${environment.apiUrl}/budgets/${budget.id}`,
      budget
    );
  }
}
