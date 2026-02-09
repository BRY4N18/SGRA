import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-preferencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss',
})
export class PreferenciasComponent implements OnDestroy {
  canales = ['Correo institucional', 'WhatsApp'];
  frecuencias = ['Diaria', 'Semanal', 'Quincenal', 'Solo importantes'];
  modalidades = ['Presencial', 'Virtual', 'Ambas'];

  canalSeleccionado = this.canales[0];
  frecuenciaSeleccionada = this.frecuencias[1];
  modalidadSeleccionada = this.modalidades[2];

  feedbackMessage = '';
  private feedbackTimeout?: number;

  constructor() {
    const storedMode = localStorage.getItem('sgra_teacher_work_mode');
    if (storedMode && this.modalidades.includes(storedMode)) {
      this.modalidadSeleccionada = storedMode;
    }
  }

  savePreferences() {
    localStorage.setItem('sgra_teacher_work_mode', this.modalidadSeleccionada);
    this.feedbackMessage = 'Pendiente de integración';
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

