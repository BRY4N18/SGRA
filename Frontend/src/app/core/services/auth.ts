import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

type Role = 'Admin' | 'Coordinador' | 'Docente' | 'Estudiante';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/SGRA/login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };

    // Realizamos la petición POST al backend
    return this.http.post<any>(this.apiUrl, loginData).pipe(
      tap(res => {
        // Si el login es exitoso (según tu LoginDTO.success), guardamos la sesión
        if (res && res.success) {
          this.saveSession(res);
        }
      })
    );
  }

  saveSession(data: any) {
    localStorage.setItem('sgra_auth', JSON.stringify(data));
    localStorage.setItem('userRole', data.role);
  }

  isLoggedIn(): boolean {
    const authData = localStorage.getItem('sgra_auth');
    return !!authData;
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout() {
    localStorage.clear();
  }
}
