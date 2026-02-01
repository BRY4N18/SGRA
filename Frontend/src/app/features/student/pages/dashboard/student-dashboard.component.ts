import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudentMockService, StudentMetrics } from '../../../../core/services/student-mock.service';

@Component({
  selector: 'app-student-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardPageComponent {
  username = localStorage.getItem('sgra_username') || 'Estudiante';
  metrics: StudentMetrics = {
    pendientes: 0,
    aceptadas: 0,
    proximas: 0,
    realizadas: 0,
  };

  constructor(private studentService: StudentMockService) {
    this.studentService.getMetrics().subscribe(metrics => (this.metrics = metrics));
  }
}
