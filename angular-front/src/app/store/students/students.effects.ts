import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as StudentsActions from './students.actions';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';


@Injectable()
export class StudentsEffects {
    constructor(
      private actions$: Actions,
      private service: StudentsService,
    ) {}

    getStudent$ = createEffect(() => this.actions$.pipe(
      ofType(StudentsActions.getStudent),
      switchMap((action) => this.service.getById(action.studentId).pipe(
        map((data) => StudentsActions.getStudentSuccess(Array.isArray(data) ? data[0] : data)),
        catchError((error) => of(StudentsActions.getStudentFailure(error)))
      ))
    ));
  
    getStudents$ = createEffect(() => this.actions$.pipe(
      ofType(StudentsActions.getStudents),
      switchMap(() => this.service.getData().pipe(
        map((data) => StudentsActions.getStudentsSuccess(data)),
        catchError((error) => of(StudentsActions.getStudentsFailure(error)))
      ))
    ));

    createStudents$ = createEffect(() => this.actions$.pipe(
      ofType(StudentsActions.createStudents),
      tap((action) => this.service.addData(action.student)),
    ));

    updateStudents$ = createEffect(() => this.actions$.pipe(
      ofType(StudentsActions.updateStudents),
      tap((action) => this.service.updateData(action.student)),
    ));

    deleteStudents$ = createEffect(() => this.actions$.pipe(
      ofType(StudentsActions.deleteStudents),
      tap((action) => this.service.deleteFilterable(action.studentId)),
    ));
}


