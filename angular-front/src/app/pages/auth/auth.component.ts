import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.([^\s@]+){2,4}$/;

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @Input() public hasAccount = true;
  @Output() public loggingIn = new EventEmitter<boolean>();

  public MIN_PASSWORD_LENGTH = 6;
  public MAX_NAME_LENGTH = 25;
  public MAX_SURNAME_LENGTH = 30;
  public submitted = false;

  public loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.MAX_NAME_LENGTH),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.maxLength(this.MAX_SURNAME_LENGTH),
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.pattern(EMAIL_REGEX),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.MIN_PASSWORD_LENGTH),
    ])
  });

  onAuth() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loggingIn.emit(true);
  }
}
