import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDashboardComponent } from './enrollment-dashboard.component';

describe('EnrollmentDashboardComponent', () => {
  let component: EnrollmentDashboardComponent;
  let fixture: ComponentFixture<EnrollmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
