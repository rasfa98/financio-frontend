import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Budget } from '../types/Budget';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${environment.apiUrl}/expenses`);
  }
}
