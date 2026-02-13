import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdministrationDashboard } from '../modelos/AdministrationDashboard';
import { GRole } from '../modelos/GRole';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/role';

  private http = inject(HttpClient);

  getDashboardStats(): Observable<AdministrationDashboard> {
    return this.http.get<AdministrationDashboard>(`${this.apiUrl}/dashboard/stats`);
  }

  getActiveRoles(): Observable<GRole[]> {
    return this.http.get<GRole[]>(`${this.apiUrl}/active`);
  }
}
