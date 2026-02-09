import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-importar-datos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './importData.component.html',
  styleUrl: './importData.component.scss',
})
export class ImportarDatosComponent {
  selectedType = 'Estudiantes';
  selectedFileName = '';

  previewRows = [
    { id: '001', nombre: 'Luis Vega', programa: 'Sistemas', estado: 'Activo' },
    { id: '002', nombre: 'María Torres', programa: 'Industrial', estado: 'Activo' },
    { id: '003', nombre: 'Ana Martínez', programa: 'Contabilidad', estado: 'Activo' },
  ];

  validationWarnings = [
    '2 registros con campos incompletos (correo institucional).',
    '1 posible duplicado en la columna de identificación.',
    'Conflicto en paralelo para 3 estudiantes.',
  ];

  handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedFileName = input.files?.[0]?.name ?? '';
  }
}

