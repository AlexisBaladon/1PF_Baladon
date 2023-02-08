import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SIMPLE_VALIDATIONS, EMAIL_VALIDATIONS, PASSWORD_VALIDATIONS } from 'src/app/constants/validations';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @Input() public hasAccount = true;
  @Output() public loggingIn = new EventEmitter();

  private formControls = {
    name: SIMPLE_VALIDATIONS,
    surname: SIMPLE_VALIDATIONS,
    email: EMAIL_VALIDATIONS,
    password: PASSWORD_VALIDATIONS,
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

  private _submitted = false;

  public get submitted(): boolean {
    return this._submitted;
  }

  public onAuth() {
    this._submitted = true;
    if (this.form.invalid) return;

    this.loggingIn.emit();
  }

  public changeAuthMode() {
    this._submitted = false;
    this.hasAccount = !this.hasAccount;
  }

  public getErrorMessages() {
    return getErrorMessages(this.form);
  }

  public isValidInput(controlName: string): boolean {
    return isValidInput(this.form, controlName, this.submitted);
  }
}
