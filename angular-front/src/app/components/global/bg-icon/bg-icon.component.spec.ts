import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgIconComponent } from './bg-icon.component';

describe('BgIconComponent', () => {
  let component: BgIconComponent;
  let fixture: ComponentFixture<BgIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BgIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BgIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
