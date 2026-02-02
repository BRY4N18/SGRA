import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherMockService } from '../../../../core/services/teacher-mock.service';
import { TeacherRequest, TeacherRequestStatus } from '../../models/teacher-request.model';

@Component({
  selector: 'app-teacher-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss',
})
export class SolicitudesComponent implements OnDestroy {
  tabs: { label: string; status: TeacherRequestStatus; icon: string }[] = [
    { label: 'Pendientes', status: 'PENDIENTE', icon: '⏳' },
    { label: 'Aceptadas', status: 'ACEPTADA', icon: '✅' },
    { label: 'Programadas', status: 'PROGRAMADA', icon: '📅' },
    { label: 'Rechazadas', status: 'RECHAZADA', icon: '❌' },
  ];
  activeStatus: TeacherRequestStatus = 'PENDIENTE';
  requests: TeacherRequest[] = [];
  selectedRequest: TeacherRequest | null = null;
  feedbackMessage = '';
  feedbackType: 'success' | 'danger' | 'info' = 'info';
  private feedbackTimeout?: number;

  constructor(private teacherService: TeacherMockService) {
    this.teacherService.getRequests().subscribe(data => (this.requests = data));
  }

  get filteredRequests(): TeacherRequest[] {
    return this.requests.filter(request => request.status === this.activeStatus);
  }

  get pendingCount(): number {
    return this.requests.filter(request => request.status === 'PENDIENTE').length;
  }

  getCount(status: TeacherRequestStatus): number {
    return this.requests.filter(request => request.status === status).length;
  }

  setTab(status: TeacherRequestStatus) {
    this.activeStatus = status;
  }

  accept(request: TeacherRequest) {
    request.status = 'ACEPTADA';
    this.activeStatus = 'ACEPTADA';
    this.showFeedback('Solicitud aceptada. Pendiente de integración con API.', 'success');
  }

  reject(request: TeacherRequest) {
    request.status = 'RECHAZADA';
    this.activeStatus = 'RECHAZADA';
    this.showFeedback('Solicitud rechazada. Pendiente de integración con API.', 'danger');
  }

  openDetail(request: TeacherRequest) {
    this.selectedRequest = request;
  }

  closeDetail() {
    this.selectedRequest = null;
  }

  ngOnDestroy() {
    if (this.feedbackTimeout) {
      window.clearTimeout(this.feedbackTimeout);
    }
  }

  private showFeedback(message: string, type: 'success' | 'danger' | 'info') {
    this.feedbackMessage = message;
    this.feedbackType = type;
    if (this.feedbackTimeout) {
      window.clearTimeout(this.feedbackTimeout);
    }
    this.feedbackTimeout = window.setTimeout(() => {
      this.feedbackMessage = '';
    }, 3200);
  }
}
