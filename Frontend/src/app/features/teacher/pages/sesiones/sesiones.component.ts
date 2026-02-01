import { Component } from '@angular/core';
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
export class SesionesComponent {
  search = '';
  modeFilter = '';
  activeTab: 'PROGRAMADA' | 'COMPLETADA' = 'PROGRAMADA';
  sessions: TeacherSession[] = [];

  constructor(private teacherService: TeacherMockService) {
    this.teacherService.getSessions().subscribe(data => (this.sessions = data));
  }

  setTab(tab: 'PROGRAMADA' | 'COMPLETADA') {
    this.activeTab = tab;
  }

  get filteredSessions(): TeacherSession[] {
    return this.sessions.filter(session => {
      const matchesStatus = session.status === this.activeTab;
      const matchesSearch =
        !this.search ||
        session.subject.toLowerCase().includes(this.search.toLowerCase()) ||
        session.student.toLowerCase().includes(this.search.toLowerCase());
      const matchesMode = !this.modeFilter || session.modality === this.modeFilter;

      return matchesStatus && matchesSearch && matchesMode;
    });
  }

  markCompleted(session: TeacherSession) {
    session.status = 'COMPLETADA';
    this.activeTab = 'COMPLETADA';
  }
}
