import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UsersActions from './users.actions';
import { UsersService } from 'src/app/services/users/users.service';

@Injectable()
export class UsersEffects {
    constructor(
      private actions$: Actions,
      private service: UsersService,
    ) {}

    getUser$ = createEffect(() => this.actions$.pipe(
      ofType(UsersActions.getUser),
      switchMap((action) => this.service.getById(action.userId).pipe(
        map((data) => UsersActions.getUserSuccess(Array.isArray(data) ? data[0] : data)),
        catchError((error) => of(UsersActions.getUserFailure(error)))
      ))
    ));
  
    getUsers$ = createEffect(() => this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap(() => this.service.getData().pipe(
        map((data) => UsersActions.getUsersSuccess(data)),
        catchError((error) => of(UsersActions.getUsersFailure(error)))
      ))
    ));

    createUsers$ = createEffect(() => this.actions$.pipe(
      ofType(UsersActions.createUsers),
      tap((action) => this.service.addData(action.user)),
    ));

    updateUsers$ = createEffect(() => this.actions$.pipe(
      ofType(UsersActions.updateUsers),
      tap((action) => this.service.updateData(action.user)),
    ));

    deleteUsers$ = createEffect(() => this.actions$.pipe(
      ofType(UsersActions.deleteUsers),
      tap((action) => this.service.deleteFilterable(action.userId)),
    ));
}


