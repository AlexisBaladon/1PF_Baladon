import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollments from './enrollments.types';

export const selectEnrollmentsState = createFeatureSelector<fromEnrollments.EnrollmentState>('enrollments');

export const selectEnrollments = createSelector(
  selectEnrollmentsState,
  (state: fromEnrollments.EnrollmentState) => state.enrollments
);

export const selectEnrollmentsError = createSelector(
  selectEnrollmentsState,
  (state: fromEnrollments.EnrollmentState) => state.error
);

export const selectEnrollment = createSelector(
  selectEnrollmentsState,
  (state: fromEnrollments.EnrollmentState) => state.selectedEnrollment
);

