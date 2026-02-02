import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-preferencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preferencias.component.html',
  styleUrl: './preferencias.component.scss',
})
export class PreferenciasComponent implements OnDestroy {
  canales = ['Correo institucional', 'WhatsApp'];
  frecuencias = ['Diaria', 'Semanal', 'Quincenal', 'Solo importantes'];

  canalSeleccionado = this.canales[0];
  frecuenciaSeleccionada = this.frecuencias[1];

  feedbackMessage = '';
  private feedbackTimeout?: number;

  savePreferences() {
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
