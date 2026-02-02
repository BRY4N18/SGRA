import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentMockService } from '../../../../core/services/student-mock.service';
import { StudentRequest, StudentRequestStatus, StudentRequestType } from '../../models/student-request.model';
import { StudentSubject } from '../../models/student-subject.model';

@Component({
  selector: 'app-student-mis-solicitudes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './mis-solicitudes.component.html',
  styleUrl: './mis-solicitudes.component.scss',
})
export class MisSolicitudesComponent {
  searchTerm = '';
  selectedStatus = '';
  selectedSubject = '';
  selectedType = '';

  statuses: StudentRequestStatus[] = [];
  types: StudentRequestType[] = [];
  subjects: StudentSubject[] = [];
  requests: StudentRequest[] = [];

  pageSize = 4;
  currentPage = 1;

  constructor(private studentService: StudentMockService) {
    this.studentService.getStatusOptions().subscribe(data => (this.statuses = data));
    this.studentService.getTypeOptions().subscribe(data => (this.types = data));
    this.studentService.getSubjects().subscribe(data => (this.subjects = data));
    this.studentService.getRequests().subscribe(data => (this.requests = data));
  }

  get filteredRequests(): StudentRequest[] {
    return this.requests.filter(request => {
      const matchesSearch =
        !this.searchTerm ||
        request.topic.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        request.subject.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.selectedStatus || request.status === this.selectedStatus;
      const matchesSubject = !this.selectedSubject || request.subject.code === this.selectedSubject;
      const matchesType = !this.selectedType || request.type === this.selectedType;

      return matchesSearch && matchesStatus && matchesSubject && matchesType;
    });
  }

  get pagedRequests(): StudentRequest[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredRequests.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredRequests.length / this.pageSize));
  }

  changePage(next: number) {
    this.currentPage = Math.min(Math.max(1, next), this.totalPages);
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedStatus = '';
    this.selectedSubject = '';
    this.selectedType = '';
    this.currentPage = 1;
  }

  getStatusClass(status: StudentRequestStatus): string {
    const map: Record<StudentRequestStatus, string> = {
      PENDIENTE: 'chip-warning',
      ACEPTADA: 'chip-success',
      PROGRAMADA: 'chip-info',
      REALIZADA: 'chip-neutral',
      'ESPERANDO ESPACIO': 'chip-wait',
    };

    return map[status] ?? 'chip-neutral';
  }

  getTypeClass(type: StudentRequestType): string {
    return type === 'GRUPAL' ? 'chip-group' : 'chip-individual';
  }
}
