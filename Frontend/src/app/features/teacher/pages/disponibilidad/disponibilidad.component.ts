import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherMockService } from '../../../../core/services/teacher-mock.service';
import { AvailabilitySlot, AvailabilityStatus } from '../../models/teacher-availability.model';

interface AvailabilityStats {
  disponibles: number;
  programadas: number;
  horasSemanales: number;
  diasActivos: number;
  distribucion: { day: string; hours: number }[];
}

@Component({
  selector: 'app-teacher-disponibilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disponibilidad.component.html',
  styleUrl: './disponibilidad.component.scss',
})
export class DisponibilidadComponent {
  days: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  times: string[] = ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00'];
  slots: AvailabilitySlot[] = [];
  feedback = '';
  stats: AvailabilityStats = {
    disponibles: 0,
    programadas: 0,
    horasSemanales: 0,
    diasActivos: 0,
    distribucion: [],
  };

  constructor(private teacherService: TeacherMockService) {
    this.teacherService.getAvailability().subscribe(data => (this.slots = data));
    this.teacherService.getAvailabilityStats().subscribe(data => (this.stats = data));
  }

  getSlot(day: string, time: string): AvailabilitySlot | undefined {
    return this.slots.find(slot => slot.day === day && slot.time === time);
  }

  toggleSlot(slot?: AvailabilitySlot) {
    if (!slot || slot.status === 'SESION') return;
    slot.status = slot.status === 'DISPONIBLE' ? 'NO_DISPONIBLE' : 'DISPONIBLE';
  }

  getStatusClass(day: string, time: string): string {
    const slot = this.getSlot(day, time);
    return slot ? slot.status.toLowerCase() : '';
  }

  clearAll() {
    this.slots = this.slots.map(slot =>
      slot.status === 'SESION' ? slot : { ...slot, status: 'NO_DISPONIBLE' as AvailabilityStatus }
    );
  }

  saveChanges() {
    this.feedback = 'Pendiente de integración con API.';
  }
}
