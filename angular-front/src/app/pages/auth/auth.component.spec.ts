import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DirectivesModule } from 'src/app/modules/shared/directives.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let httpMock: HttpTestingController;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ AuthComponent ],
        providers: [ AuthService ],
        imports: [ HttpClientTestingModule, DirectivesModule, ReactiveFormsModule ],
      })
      .compileComponents();
    fixture = TestBed.createComponent(AuthComponent);
    httpMock = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show login form with email and password', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
  });

  it('should show signup form with name, surname, email and password', () => {
    const compiled = fixture.nativeElement;
    const doesntHaveAccountAction = compiled.querySelector('#has-account-action');
    doesntHaveAccountAction.click();
    fixture.detectChanges();

    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[formcontrolname="name"]')).toBeTruthy();
    expect(compiled.querySelector('input[formcontrolname="surname"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
  });

  it('should reject invalid inputs', () => {
    const compiled = fixture.nativeElement;
    const form = compiled.querySelector('form');
    const emailInput = compiled.querySelector('input[type="email"]');
    const passwordInput = compiled.querySelector('input[type="password"]');
    const submitButton = compiled.querySelector('button[type="submit"]');

    emailInput.value = 'test'; // invalid email
    emailInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'p'; // too short
    passwordInput.dispatchEvent(new Event('input'));
    submitButton.click();

    expect(form.classList.contains('ng-invalid')).toBe(true);
  });

});
