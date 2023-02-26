import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudents from './students.types';

export const selectStudentsState = createFeatureSelector<fromStudents.StudentState>('students');

export const selectStudents = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentState) => state.students
);

export const selectStudentsError = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentState) => state.error
);

export const selectStudent = createSelector(
  selectStudentsState,
  (state: fromStudents.StudentState) => state.selectedStudent
);

