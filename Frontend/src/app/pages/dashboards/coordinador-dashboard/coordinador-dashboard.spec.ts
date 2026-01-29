import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadorDashboard } from './coordinador-dashboard';

describe('CoordinadorDashboard', () => {
  let component: CoordinadorDashboard;
  let fixture: ComponentFixture<CoordinadorDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinadorDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinadorDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
