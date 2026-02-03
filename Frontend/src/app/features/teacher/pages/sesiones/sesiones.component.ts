import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeacherMockService } from '../../../../core/services/teacher-mock.service';
import { TeacherSession } from '../../models/teacher-session.model';

@Component({
  selector: 'app-teacher-sesiones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sesiones.component.html',
  styleUrl: './sesiones.component.scss',
})
export class SesionesComponent implements OnDestroy {
  search = '';
  statusFilter: 'PROGRAMADA' | 'EN_CURSO' | 'REALIZADA' | '' = '';
  sessions: TeacherSession[] = [];
  feedbackMessage = '';
  feedbackType: 'success' | 'danger' | 'info' = 'info';
  selectedSession: TeacherSession | null = null;
  finalObservations = '';
  finalResults = '';
  finalState = 'Culminada';
  private feedbackTimeout?: number;

  constructor(private teacherService: TeacherMockService) {
    this.teacherService.getSesiones().subscribe(data => (this.sessions = data));
  }

  get filteredSessions(): TeacherSession[] {
    return this.sessions.filter(session => {
      const matchesSearch =
        !this.search ||
        session.subject.toLowerCase().includes(this.search.toLowerCase()) ||
        session.student.toLowerCase().includes(this.search.toLowerCase()) ||
        session.topic.toLowerCase().includes(this.search.toLowerCase());
      const matchesStatus = !this.statusFilter || session.status === this.statusFilter;

      return matchesStatus && matchesSearch;
    });
  }

  formatStatus(status: TeacherSession['status']): string {
    switch (status) {
      case 'EN_CURSO':
        return 'En curso';
      case 'REALIZADA':
        return 'Realizada';
      default:
        return 'Programada';
    }
  }

  abrirAsistencia(session: TeacherSession) {
    this.teacherService.abrirAsistencia(session.id).subscribe(() => {
      session.attendanceOpen = true;
      this.showFeedback('Pendiente de integración', 'info');
    });
  }

  cerrarAsistencia(session: TeacherSession) {
    this.teacherService.cerrarAsistencia(session.id).subscribe(() => {
      session.attendanceOpen = false;
      this.showFeedback('Pendiente de integración', 'info');
    });
  }

  openFinalize(session: TeacherSession) {
    this.selectedSession = session;
    this.finalObservations = session.observations || '';
    this.finalResults = session.results || '';
    this.finalState = session.finalStatus || 'Culminada';
  }

  closeFinalize() {
    this.selectedSession = null;
  }

  saveFinalize() {
    if (!this.selectedSession) {
      return;
    }
    this.teacherService
      .finalizarSesion({
        idSesion: this.selectedSession.id,
        observaciones: this.finalObservations,
        resultados: this.finalResults,
        estadoFinal: this.finalState,
      })
      .subscribe(() => {
        this.selectedSession!.status = 'REALIZADA';
        this.selectedSession!.observations = this.finalObservations;
        this.selectedSession!.results = this.finalResults;
        this.selectedSession!.finalStatus = this.finalState;
        this.closeFinalize();
        this.showFeedback('Pendiente de integración', 'success');
      });
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

  ngOnDestroy() {
    if (this.feedbackTimeout) {
      window.clearTimeout(this.feedbackTimeout);
    }
  }
}
