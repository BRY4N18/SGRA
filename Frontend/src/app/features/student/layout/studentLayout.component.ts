import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './studentLayout.component.html',
  styleUrl: './studentLayout.component.scss',
})
export class StudentLayoutComponent {
  private titleSignal = signal('Dashboard Estudiante');
  username = localStorage.getItem('sgra_username') || 'Estudiante';
  isSidebarCollapsed = window.innerWidth < 992;
  isRoleMenuOpen = false;
  availableRoles = this.getAvailableRoles();
  activeRole = this.getActiveRole();

  title = computed(() => this.titleSignal());

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const child = this.getDeepestChild(this.route);
      this.titleSignal.set(child.snapshot.data['title'] || 'Dashboard Estudiante');
    });
  }

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
    return (
      localStorage.getItem('sgra_role') ||
      'STUDENT'
    );
  }

  private getAvailableRoles(): string[] {
    const raw = localStorage.getItem('sgra_role');
    if (!raw) return ['STUDENT'];

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

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}

