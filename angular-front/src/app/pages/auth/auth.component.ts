import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EMAIL_REGEX, SIMPLE_INPUTS_MIN_LENGTH, PASSWORD_MIN_LENGTH, INPUTS_MAX_LENGTH } from 'src/app/constants/validations';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @Input() public hasAccount = true;
  @Output() public loggingIn = new EventEmitter();

  public submitted = false;

  private formControls = {
    name: [
      Validators.required,
      Validators.minLength(SIMPLE_INPUTS_MIN_LENGTH),
      Validators.maxLength(INPUTS_MAX_LENGTH),
    ],
    surname: [
      Validators.required,
      Validators.minLength(SIMPLE_INPUTS_MIN_LENGTH),
      Validators.maxLength(INPUTS_MAX_LENGTH),
    ],
    email: [
      Validators.required, 
      Validators.minLength(SIMPLE_INPUTS_MIN_LENGTH),
      Validators.maxLength(INPUTS_MAX_LENGTH),
      Validators.pattern(EMAIL_REGEX),
    ],
    password: [
      Validators.required,
      Validators.minLength(PASSWORD_MIN_LENGTH),
      Validators.maxLength(INPUTS_MAX_LENGTH),
    ]
  }

  private loginForm = new FormGroup({
    email: new FormControl('', [...this.formControls.email]),
    password: new FormControl('', [...this.formControls.password]),
  });

  private signupForm = new FormGroup({
    name: new FormControl('', [...this.formControls.name]),
    surname: new FormControl('', [...this.formControls.surname]),
    email: new FormControl('', [...this.formControls.email]),
    password: new FormControl('', [...this.formControls.password]),
  });

  public get form(): FormGroup {
    return this.hasAccount ? this.loginForm : this.signupForm;
  }

  public onAuth() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loggingIn.emit();
  }

  public changeAuthMode() {
    this.submitted = false;
    this.hasAccount = !this.hasAccount;
  }

  public getErrorMessages() {
    return getErrorMessages(this.form);
  }

  public isValidInput(controlName: string): boolean {
    return isValidInput(this.form, controlName, this.submitted);
  }
}
