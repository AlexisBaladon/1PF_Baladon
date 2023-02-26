import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.types';

export const selectCoursesState = createFeatureSelector<fromCourses.CourseState>('courses');

export const selectCourses = createSelector(
  selectCoursesState,
  (state: fromCourses.CourseState) => state.courses
);

export const selectCoursesError = createSelector(
  selectCoursesState,
  (state: fromCourses.CourseState) => state.error
);

export const selectCourse = createSelector(
  selectCoursesState,
  (state: fromCourses.CourseState) => state.selectedCourse
);

