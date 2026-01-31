import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesComponent } from './userRoles.component';

describe('UserRolesComponent', () => {
  let component: UserRolesComponent;
  let fixture: ComponentFixture<UserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRolesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
