import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './student-layout.component.html',
  styleUrl: './student-layout.component.scss',
})
export class StudentLayoutComponent {
  private titleSignal = signal('Dashboard Estudiante');
  username = localStorage.getItem('sgra_username') || 'Estudiante';

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

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    let current = route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current;
  }
}
