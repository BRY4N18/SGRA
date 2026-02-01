import { Component } from '@angular/core';
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
export class SolicitudesComponent {
  tabs: { label: string; status: TeacherRequestStatus }[] = [
    { label: 'Pendientes', status: 'PENDIENTE' },
    { label: 'Aceptadas', status: 'ACEPTADA' },
    { label: 'Programadas', status: 'PROGRAMADA' },
    { label: 'Rechazadas', status: 'RECHAZADA' },
  ];
  activeStatus: TeacherRequestStatus = 'PENDIENTE';
  requests: TeacherRequest[] = [];
  selectedRequest: TeacherRequest | null = null;

  constructor(private teacherService: TeacherMockService) {
    this.teacherService.getRequests().subscribe(data => (this.requests = data));
  }

  get filteredRequests(): TeacherRequest[] {
    return this.requests.filter(request => request.status === this.activeStatus);
  }

  setTab(status: TeacherRequestStatus) {
    this.activeStatus = status;
  }

  accept(request: TeacherRequest) {
    request.status = 'ACEPTADA';
    this.activeStatus = 'ACEPTADA';
  }

  reject(request: TeacherRequest) {
    request.status = 'RECHAZADA';
    this.activeStatus = 'RECHAZADA';
  }

  openDetail(request: TeacherRequest) {
    this.selectedRequest = request;
  }

  closeDetail() {
    this.selectedRequest = null;
  }
}
