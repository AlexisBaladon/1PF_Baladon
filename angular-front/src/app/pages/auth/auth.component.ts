import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SIMPLE_VALIDATIONS, EMAIL_VALIDATIONS, PASSWORD_VALIDATIONS } from 'src/app/constants/validations';
import User from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { getErrorMessages, isValidInput } from 'src/app/utils/formControl';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public hasAccount = true;
  private _submitted = false;
  private user: User | null = null;
  private user$!: Subscription;
  private error: string | null = null;
  private error$!: Subscription;
  
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = user;
      if (!!user) {
        this.router.navigate(['/layout']);
      }
    });

    this.error$ = this.authService.getError().subscribe(error => {
      this.error = error;
    });

    if (!!this.user) {
      this.router.navigate(['/layout']);
    }
  }

  ngOnDestroy() {
    if (!!this.user$) {
      this.user$.unsubscribe();
    }
    if (!!this.error$) {
      this.error$.unsubscribe();
    }
  }

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


  public get submitted(): boolean {
    return this._submitted;
  }

  public onAuth() {
    this._submitted = true;
    if (this.form.invalid) return;

    if (this.hasAccount) {
      this.authService.login(this.form.value.email, this.form.value.password);
    }
    else {
      this.authService.signup(this.form.value.name, this.form.value.surname, this.form.value.email, this.form.value.password);
    }

    if (!!this.error) {
      console.warn(this.error);
      return;
    }
    
    this.router.navigate(['/layout']);
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
