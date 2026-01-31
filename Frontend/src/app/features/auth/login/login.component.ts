import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

type Role = 'Admin' | 'Coordinador' | 'Docente' | 'Estudiante';

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

    if (this.user.trim() || this.pass.trim()) {
      this.error = 'Por favor, completa todos los campos';
      return;
    }

    this.auth.login(this.user.trim(), this.pass).subscribe({
      next: (res) => {
        if (res && res.success) {
          const map: Record<Role, string> = {
            Admin: '/dashboard/admin',
            Coordinador: '/dashboard/coordinador',
            Docente: '/dashboard/docente',
            Estudiante: '/dashboard/estudiante',
          };

          this.router.navigateByUrl(map[res.role as Role]);
        } else {
          this.error = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        this.error = 'No se pudo conectar con el servidor. Inténtalo más tarde.';
        console.error('Login error:', err);
      }
    });
  }
}
