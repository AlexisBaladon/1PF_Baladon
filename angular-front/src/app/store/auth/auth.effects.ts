import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as AuthActions from './auth.actions';
@Injectable()
export class AuthEffects {
    constructor(
      private actions$: Actions,
      private service: AuthService,
    ) {}

    login$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.login),
      tap(action => this.service.login(action.email, action.password)),
      switchMap(() => of(AuthActions._login())),
    ));

    register$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.register),
      tap(action => this.service.signup(action.name, action.password, action.email, action.password)),
      switchMap(() => of(AuthActions._register())),
    ));

    logout$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => this.service.logout()),
      switchMap(() => of(AuthActions._logout())),
    ));

    getUser$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() => this.service.getUser().pipe(
        switchMap(user => user ? of(AuthActions.getUserSuccess(user)) : of(AuthActions.getUserFailure(null))),
      )),
    ));

    getError$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.getError, AuthActions._register),
      switchMap(() => this.service.getError().pipe(
        switchMap(error => of(AuthActions._getError(error ? new Error(error) : new Error('')))),
      )),
    ));

    setCurrentPage$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.setCurrentPage),
      map(action => action.currentPage),
    ), { dispatch: false });
}


