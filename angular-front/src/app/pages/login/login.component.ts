import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.([^\s@]+){2,4}$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public MIN_PASSWORD_LENGTH = 6;
  public submitted = false;

  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required, 
      Validators.pattern(EMAIL_REGEX),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.MIN_PASSWORD_LENGTH),
    ])
  });  

  onLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) return;


    const { email, password } = this.loginForm.value;
    const testUser = { email: 'a@a.com', password: '123456' };
    if (email === testUser.email && password === testUser.password) {
      console.log('login success');
    }
  }

  console = console;

}
