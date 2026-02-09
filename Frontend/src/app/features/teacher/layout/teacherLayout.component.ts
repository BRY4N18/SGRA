import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './teacherLayout.component.html',
  styleUrl: './teacherLayout.component.scss',
})
export class TeacherLayoutComponent {
  username = localStorage.getItem('sgra_username') || 'Usuario';
  isSidebarCollapsed = window.innerWidth < 992;
  isRoleMenuOpen = false;
  availableRoles = this.getAvailableRoles();
  activeRole = this.getActiveRole();

  constructor(private auth: AuthService, private router: Router) {}

  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleRoleMenu() {
    this.isRoleMenuOpen = !this.isRoleMenuOpen;
  }

  selectRole(role: string) {
    this.activeRole = role;
    this.isRoleMenuOpen = false;
  }

  formatRole(role: string): string {
    const map: Record<string, string> = {
      STUDENT: 'Estudiante',
      TEACHER: 'Docente',
      ADMIN: 'Administrador',
      COORDINATOR: 'Coordinador',
    };
    return map[role] ?? role;
  }

  private getActiveRole(): string {
    return localStorage.getItem('sgra_role') || 'TEACHER';
  }

  private getAvailableRoles(): string[] {
    const raw = localStorage.getItem('sgra_role');
    if (!raw) return ['TEACHER'];

    const trimmed = raw.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map(role => String(role).trim()).filter(Boolean);
        }
      } catch {
        return [trimmed];
      }
    }

    if (trimmed.includes(',')) {
      return trimmed
        .split(',')
        .map(role => role.trim())
        .filter(Boolean);
    }

    return [trimmed];
  }
}

