import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilterModalComponent } from './add-filter-modal.component';

describe('AddFilterModalComponent', () => {
  let component: AddFilterModalComponent;
  let fixture: ComponentFixture<AddFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
