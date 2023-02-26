import { createReducer, on } from '@ngrx/store';
import * as EnrollmentsActions from './enrollments.actions';
import { EnrollmentState } from './enrollments.types';

export const enrollmentsFeatureKey = 'enrollments';

const initialState: EnrollmentState = {
  enrollments: [],
  selectedEnrollment: null,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(EnrollmentsActions.getEnrollmentSuccess, (state, action) => {
    return {
      ...state,
      enrollments: [...state.enrollments, action.enrollment],
      selectedEnrollment: action.enrollment,
      error: null
    };
  }),

  on(EnrollmentsActions.getEnrollmentFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(EnrollmentsActions.getEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollments: action.enrollments,
      error: null
    };
  }),

  on(EnrollmentsActions.getEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(EnrollmentsActions.createEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollments: [...state.enrollments, action.enrollment],
      error: null
    };
  }),

  on(EnrollmentsActions.createEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(EnrollmentsActions.updateEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollments: state.enrollments.map(enrollment => {
        if (enrollment.id === action.enrollment.id) {
          return action.enrollment;
        }
        return enrollment;
      }),
      error: null
    };
  }),

  on(EnrollmentsActions.updateEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(EnrollmentsActions.deleteEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollments: state.enrollments.filter(enrollment => enrollment.id !== action.enrollmentId),
      error: null
    };
  }),

  on(EnrollmentsActions.deleteEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })

);
