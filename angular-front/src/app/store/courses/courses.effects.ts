import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CoursesActions from './courses.actions';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';


@Injectable()
export class CoursesEffects {
    constructor(
      private actions$: Actions,
      private service: CoursesService,
    ) {}

    getCourse$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.getCourse),
      switchMap((action) => this.service.getById(action.courseId).pipe(
        map((data) => CoursesActions.getCourseSuccess(Array.isArray(data) ? data[0] : data)),
        catchError((error) => of(CoursesActions.getCourseFailure(error)))
      ))
    ));
  
    getCourses$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.getCourses),
      switchMap(() => this.service.getData().pipe(
        map((data) => CoursesActions.getCoursesSuccess(data)),
        catchError((error) => of(CoursesActions.getCoursesFailure(error)))
      ))
    ));

    createCourses$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.createCourses),
      tap((action) => this.service.addData(action.course)),
    ));

    updateCourses$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.updateCourses),
      tap((action) => this.service.updateData(action.course)),
    ));

    deleteCourses$ = createEffect(() => this.actions$.pipe(
      ofType(CoursesActions.deleteCourses),
      tap((action) => this.service.deleteFilterable(action.courseId)),
    ));
}


