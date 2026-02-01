import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export type Role = 'STUDENT' | 'TEACHER' | 'COORDINATOR' | 'ADMIN';

export interface AuthResponse {
  token: string;
  role: Role;
  userId: number;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    const loginData = { username, password };

    return this.http.post<AuthResponse>(this.apiUrl, loginData).pipe(
      tap(res => {
        if (res?.token) {
          this.saveSession(res);
        }
      })
    );
  }

  saveSession(data: AuthResponse) {
    localStorage.setItem('sgra_token', data.token);
    localStorage.setItem('sgra_role', data.role);
    localStorage.setItem('sgra_user_id', String(data.userId));
    localStorage.setItem('sgra_username', data.username);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('sgra_token');
  }

  getRole(): Role | null {
    return localStorage.getItem('sgra_role') as Role | null;
  }

  getToken(): string | null {
    return localStorage.getItem('sgra_token');
  }

  logout() {
    localStorage.removeItem('sgra_token');
    localStorage.removeItem('sgra_role');
    localStorage.removeItem('sgra_user_id');
    localStorage.removeItem('sgra_username');
  }
}
