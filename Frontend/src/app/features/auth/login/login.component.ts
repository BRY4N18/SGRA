import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Role } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  user = '';
  pass = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.message = '';
    this.error = '';

    if (!this.user.trim() || !this.pass.trim()) {
      this.error = 'Por favor, completa todos los campos';
      return;
    }

    this.auth.login(this.user.trim(), this.pass).subscribe({
      next: (res) => {
        const map: Record<Role, string> = {
          ADMIN: '/dashboard/admin',
          COORDINATOR: '/dashboard/coordinador',
          TEACHER: '/dashboard/docente',
          STUDENT: '/dashboard/estudiante',
        };

        this.router.navigateByUrl(map[res.role] ?? '/dashboard/estudiante');
      },
      error: (err) => {
        if (err?.status === 401) {
          this.error = 'Usuario o contraseña incorrectos';
        } else if (err?.status === 403) {
          this.error = err?.error?.message ?? 'Cuenta inactiva. Contacta al administrador.';
        } else {
          this.error = 'No se pudo conectar con el servidor. Inténtalo más tarde.';
        }
      },
    });
  }
}
