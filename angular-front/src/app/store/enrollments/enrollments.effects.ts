import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as EnrollmentsActions from './enrollments.actions';
import { EnrollmentsService } from 'src/app/services/filterables/concrete-data/enrollments/enrollments.service';

@Injectable()
export class EnrollmentsEffects {
    constructor(
      private actions$: Actions,
      private service: EnrollmentsService,
    ) {}

    getEnrollment$ = createEffect(() => this.actions$.pipe(
      ofType(EnrollmentsActions.getEnrollment),
      switchMap((action) => this.service.getById(action.enrollmentId).pipe(
        map((data) => EnrollmentsActions.getEnrollmentSuccess(Array.isArray(data) ? data[0] : data)),
        catchError((error) => of(EnrollmentsActions.getEnrollmentFailure(error)))
      ))
    ));
  
    getEnrollments$ = createEffect(() => this.actions$.pipe(
      ofType(EnrollmentsActions.getEnrollments),
      switchMap(() => this.service.getData().pipe(
        map((data) => EnrollmentsActions.getEnrollmentsSuccess(data)),
        catchError((error) => of(EnrollmentsActions.getEnrollmentsFailure(error)))
      ))
    ));

    createEnrollments$ = createEffect(() => this.actions$.pipe(
      ofType(EnrollmentsActions.createEnrollments),
      tap((action) => this.service.addData(action.enrollment)),
    ));

    updateEnrollments$ = createEffect(() => this.actions$.pipe(
      ofType(EnrollmentsActions.updateEnrollments),
      tap((action) => this.service.updateData(action.enrollment)),
    ));

    deleteEnrollments$ = createEffect(() => this.actions$.pipe(
      ofType(EnrollmentsActions.deleteEnrollments),
      tap((action) => this.service.deleteFilterable(action.enrollmentId)),
    ));
}


