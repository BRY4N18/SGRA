import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherMockService } from '../../../../core/services/teacherMock.service';
import { AvailabilitySlot, AvailabilityStatus } from '../../models/teacherAvailability.model';
import { AvailabilityStats } from '../../models/AvailabilityStats';

@Component({
  selector: 'app-teacher-disponibilidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss',
})
export class DisponibilidadComponent {
  days: string[] = ['Sáb', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
  quickDays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  times: string[] = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];
  blockOptions: string[] = ['Seleccionar bloque', 'Bloque Mañana', 'Bloque Tarde'];
  selectedDay = 'Lun';
  selectedBlock = this.blockOptions[0];
  slots: AvailabilitySlot[] = [];
  feedback = '';
  feedbackType: 'info' | 'success' = 'info';
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

  getSlotStatus(day: string, time: string): AvailabilityStatus | null {
    return this.getSlot(day, time)?.status ?? null;
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
    this.feedback = 'Disponibilidad restablecida.';
    this.feedbackType = 'info';
  }

  saveChanges() {
    this.feedback = 'Pendiente de integración con API.';
    this.feedbackType = 'success';
  }

  selectDay(day: string) {
    this.selectedDay = day;
  }

  selectBlock(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedBlock = target.value;
  }

  getDaySlots(day: string): number {
    return this.slots.filter(slot => slot.day === day && slot.status === 'DISPONIBLE').length;
  }

  getEndTime(time: string): string {
    const [hours] = time.split(':').map(Number);
    const next = hours + 1;
    return `${String(next).padStart(2, '0')}:00`;
  }
}

