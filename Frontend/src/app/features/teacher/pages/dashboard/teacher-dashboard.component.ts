import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeacherMockService } from '../../../../core/services/teacher-mock.service';
import { TeacherDashboardMetrics, TeacherHourIndicator, TeacherPeriodIndicator } from '../../models/teacher-dashboard.model';
import { TeacherRequest } from '../../models/teacher-request.model';
import { TeacherSession } from '../../models/teacher-session.model';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.scss',
})
export class TeacherDashboardComponent {
  username = localStorage.getItem('sgra_username') || 'Docente';
  metrics: TeacherDashboardMetrics = { pendientes: 0, programadas: 0, completadas: 0, atendidos: 0 };
  periodIndicators: TeacherPeriodIndicator[] = [];
  hoursIndicator: TeacherHourIndicator | null = null;
  pendingRequests: TeacherRequest[] = [];
  upcomingSessions: TeacherSession[] = [];

  constructor(private teacherService: TeacherMockService) {
    this.teacherService.getDashboardMetrics().subscribe(data => (this.metrics = data));
    this.teacherService.getPeriodIndicators().subscribe(data => (this.periodIndicators = data));
    this.teacherService.getHoursIndicator().subscribe(data => (this.hoursIndicator = data));
    this.teacherService.getRequests().subscribe(data => {
      this.pendingRequests = data.filter(request => request.status === 'PENDIENTE');
    });
    this.teacherService.getSessions().subscribe(data => {
      this.upcomingSessions = data.filter(session => session.status === 'PROGRAMADA');
    });
  }
}
