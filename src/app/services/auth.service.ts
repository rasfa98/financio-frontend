import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';
import { LoginRequest, LoginResponse } from '../interfaces/login';
import { RegisterRequest } from '../interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private authSubject = new BehaviorSubject<Auth>({
    isAuthenticated: this.isAuthenticated(),
  });

  public readonly authObservable = this.authSubject.asObservable();

  setToken(token: string): void {
    this.authSubject.next({ isAuthenticated: true });
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    return Boolean(token);
  }

  logout(): void {
    this.authSubject.next({ isAuthenticated: false });
    this.removeToken();
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`,
      data
    );
  }

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/auth/register`, data);
  }
}
