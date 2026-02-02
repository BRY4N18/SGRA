import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coordinator-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coordinatorDashboard.html',
  styleUrl: './coordinatorDashboard.scss',
})
export class CoordinatorDashboardComponent {
  username = localStorage.getItem('sgra_username') || 'Coordinador';
}
