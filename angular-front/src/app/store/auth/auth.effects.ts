import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {

  authAuths$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AuthActions.authAuths),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AuthActions.authAuthsSuccess({ data })),
          catchError(error => of(AuthActions.authAuthsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
