import { TestBed, fakeAsync, tick  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let user$: Subscription;
  let error$: Subscription;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    })
    .compileComponents();
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login and logout a user', fakeAsync(() => {
    const mockUser = { email: 'test@test.com', password: 'testPassword' };
    const loginMockResponse = { mockUser };
    const logoutMockResponse = {};
    let error$!: Subscription;

    error$ = authService.getError().subscribe((error) => {
      expect(error).toBe(null);
    });

    authService.login(mockUser.email, mockUser.password);
    const reqLogin = httpMock.expectOne('/api/auth/login');
    expect(reqLogin.request.method).toBe('POST');    
    expect(reqLogin.request.body).toEqual({ email: mockUser.email, password: mockUser.password });
    reqLogin.flush(loginMockResponse);
    expect(authService.isLoggedIn()).toBe(true);

    authService.logout();
    const reqLogout = httpMock.expectOne('/api/auth/logout');
    expect(reqLogout.request.method).toBe('DELETE');
    reqLogout.flush(logoutMockResponse);

    expect(authService.isLoggedIn()).toBe(false);

    error$.unsubscribe();
    tick();
  }));

  it('should signup and log a user', fakeAsync(() => {
    const loginUser = {email: 'test@test.com', password: 'testPassword'};
    const signupUser = { name: 'testName', surname: 'testSurname', ...loginUser  };
    
    expect(authService.isLoggedIn()).toBe(false);
    authService.signup(signupUser.name, signupUser.surname, signupUser.email, signupUser.password);
    const reqSignup = httpMock.expectOne('/api/auth/signup');
    expect(reqSignup.request.method).toBe('POST');
    expect(reqSignup.request.body).toEqual({...signupUser, responseType: 'json'});
    reqSignup.flush(signupUser);
    const reqLogin = httpMock.expectOne('/api/auth/login');
    expect(reqLogin.request.method).toBe('POST');
    expect(reqLogin.request.body).toEqual(loginUser);
    reqLogin.flush(loginUser);
    expect(authService.isLoggedIn()).toBe(true);

    tick();
  }))
  
  afterEach(() => {
    httpMock.verify();
  });
});
