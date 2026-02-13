import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpaceResource } from '../../modelos/SpaceResource';
import { SpaceCard } from '../../modelos/SpaceCard';

@Component({
  selector: 'app-espacios-fisicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './physicalSpaces.component.html',
  styleUrl: './physicalSpaces.component.scss',
})
export class EspaciosFisicosComponent {
  search = '';
  typeFilter = 'Todos';
  buildingFilter = 'Todos';
  statusFilter = 'Todos';
  activeView: 'cards' | 'table' = 'cards';

  kpis = [
    { label: 'Total Espacios', value: 5, icon: 'bi-building' },
    { label: 'Disponibles', value: 5, icon: 'bi-check-circle' },
    { label: 'En uso', value: 0, icon: 'bi-calendar2-check' },
    { label: 'Capacidad Total', value: 135, icon: 'bi-people' },
  ];

  spaces: SpaceCard[] = [
    {
      id: 1,
      type: 'Aula',
      name: 'Aula 101',
      building: 'Edificio A',
      capacity: 40,
      resources: [{ name: 'Proyector' }, { name: 'Pizarra' }, { name: 'Aire Acondicionado' }],
      occupancy: 66,
      status: 'Disponible',
    },
    {
      id: 2,
      type: 'Laboratorio',
      name: 'Laboratorio 201',
      building: 'Edificio B',
      capacity: 25,
      resources: [{ name: 'Computadoras' }, { name: 'Proyector' }, { name: 'Pizarra' }, { name: '+2' }],
      occupancy: 28,
      status: 'Disponible',
    },
    {
      id: 3,
      type: 'Aula',
      name: 'Aula 102',
      building: 'Edificio A',
      capacity: 35,
      resources: [{ name: 'Proyector' }, { name: 'Pizarra' }],
      occupancy: 78,
      status: 'En uso',
    },
    {
      id: 4,
      type: 'Sala de Reuniones',
      name: 'Sala de Reuniones 301',
      building: 'Edificio C',
      capacity: 15,
      resources: [{ name: 'Videoconferencia' }, { name: 'Proyector' }, { name: 'WiFi' }, { name: '+1' }],
      occupancy: 79,
      status: 'Disponible',
    },
    {
      id: 5,
      type: 'Biblioteca',
      name: 'Sala de Estudio Biblioteca',
      building: 'Biblioteca',
      capacity: 20,
      resources: [{ name: 'WiFi' }],
      occupancy: 71,
      status: 'Disponible',
    },
  ];

  get filteredSpaces(): SpaceCard[] {
    return this.spaces.filter(space => {
      const matchesSearch =
        !this.search ||
        space.name.toLowerCase().includes(this.search.toLowerCase()) ||
        space.building.toLowerCase().includes(this.search.toLowerCase());
      const matchesType = this.typeFilter === 'Todos' || space.type === this.typeFilter;
      const matchesBuilding = this.buildingFilter === 'Todos' || space.building === this.buildingFilter;
      const matchesStatus = this.statusFilter === 'Todos' || space.status === this.statusFilter;

      return matchesSearch && matchesType && matchesBuilding && matchesStatus;
    });
  }

  clearFilters() {
    this.search = '';
    this.typeFilter = 'Todos';
    this.buildingFilter = 'Todos';
    this.statusFilter = 'Todos';
  }
}

