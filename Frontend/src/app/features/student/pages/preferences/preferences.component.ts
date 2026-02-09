import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-preferencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss',
})
export class PreferenciasComponent {
  channel = 'Correo';
  frequency = 'Semanal';
  feedback = '';

  savePreferences() {
    this.feedback = 'Guardado (mock). Pendiente integración.';
  }
}

