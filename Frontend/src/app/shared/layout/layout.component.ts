import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
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
      COORDINATOR: 'Coordinación',
    };
    return map[role] ?? role;
  }

  private getActiveRole(): string {
    return localStorage.getItem('sgra_role') || 'COORDINATOR';
  }

  private getAvailableRoles(): string[] {
    const raw = localStorage.getItem('sgra_role');
    if (!raw) return ['COORDINATOR'];

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
