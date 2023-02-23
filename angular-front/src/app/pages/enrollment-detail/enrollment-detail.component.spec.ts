import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDetailComponent } from './enrollment-detail.component';

describe('EnrollmentDetailComponent', () => {
  let component: EnrollmentDetailComponent;
  let fixture: ComponentFixture<EnrollmentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
