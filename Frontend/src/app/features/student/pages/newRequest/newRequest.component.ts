import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentMockService } from '../../../../core/services/studentMock.service';
import { StudentSubject } from '../../models/studentSubject.model';
import { StudentTeacher } from '../../models/studentTeacher.model';
import { StudentTimeSlot } from '../../models/studentTimeSlot.model';
import { StudentGroupmate } from '../../models/studentGroupmate.model';
import { StudentRequestType } from '../../models/studentRequest.model';

@Component({
  selector: 'app-student-nueva-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './newRequest.component.html',
  styleUrl: './newRequest.component.scss',
})
export class NuevaSolicitudComponent {
  step = 1;
  subjectId = '';
  teacherId = '';
  topic = '';
  reason = '';
  attachmentName = '';
  requestType: StudentRequestType | '' = '';
  modality = '';
  selectedGroupmates: number[] = [];
  selectedTimeSlot = '';
  submittedMessage = '';
  groupmateSearch = '';

  subjects: StudentSubject[] = [];
  teachers: StudentTeacher[] = [];
  timeSlots: StudentTimeSlot[] = [];
  groupmates: StudentGroupmate[] = [];

  constructor(private studentService: StudentMockService, private router: Router) {
    this.studentService.getSubjects().subscribe(data => (this.subjects = data));
    this.studentService.getTeachers().subscribe(data => (this.teachers = data));
    this.studentService.getTimeSlots().subscribe(data => (this.timeSlots = data));
    this.studentService.getGroupmates().subscribe(data => (this.groupmates = data));
  }

  nextStep() {
    if (this.step === 1 && (!this.subjectId || !this.teacherId)) {
      return;
    }
    this.step = Math.min(3, this.step + 1);
  }

  prevStep() {
    this.step = Math.max(1, this.step - 1);
  }

  cancel() {
    this.router.navigateByUrl('/dashboard/estudiante');
  }

  toggleGroupmate(id: number) {
    if (this.selectedGroupmates.includes(id)) {
      this.selectedGroupmates = this.selectedGroupmates.filter(item => item !== id);
    } else {
      this.selectedGroupmates = [...this.selectedGroupmates, id];
    }
  }

  selectAllGroupmates() {
    this.selectedGroupmates = this.groupmates.map(mate => mate.id);
  }

  clearGroupmates() {
    this.selectedGroupmates = [];
  }

  submit() {
    this.submittedMessage = 'Pendiente de integración';
  }

  get subjectLabel(): string {
    return this.subjects.find(item => item.code === this.subjectId)?.name ?? '-';
  }

  get teacherLabel(): string {
    return this.teachers.find(item => String(item.id) === this.teacherId)?.name ?? '-';
  }

  get timeSlotLabel(): string {
    return this.timeSlots.find(item => String(item.id) === this.selectedTimeSlot)?.label ?? '-';
  }

  get filteredGroupmates(): StudentGroupmate[] {
    const query = this.groupmateSearch.trim().toLowerCase();
    if (!query) return this.groupmates;
    return this.groupmates.filter(mate => mate.name.toLowerCase().includes(query));
  }

}

