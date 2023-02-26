import { createAction } from '@ngrx/store';
import { Enrollment } from 'src/app/models/enrollment';

export const createEnrollments = createAction(
  'ADD_ENROLLMENT',
  (enrollment: Enrollment) => ({ enrollment })
);

export const createEnrollmentsSuccess = createAction(
  'ADD_ENROLLMENT_SUCCESS',
  (enrollment: Enrollment) => ({ enrollment })
);

export const createEnrollmentsFailure = createAction(
  'ADD_ENROLLMENT_FAILURE',
  (error: string) => ({ error })
);

export const updateEnrollments = createAction(
  'UPDATE_ENROLLMENT',
  (enrollment: Enrollment) => ({ enrollment })
);

export const updateEnrollmentsSuccess = createAction(
  'UPDATE_ENROLLMENT_SUCCESS',
  (enrollment: Enrollment) => ({ enrollment })
);

export const updateEnrollmentsFailure = createAction(
  'UPDATE_ENROLLMENT_FAILURE',
  (error: string) => ({ error })
);

export const deleteEnrollments = createAction(
  'DELETE_ENROLLMENT',
  (enrollmentId: Enrollment['id']) => ({ enrollmentId })
  );
  
export const deleteEnrollmentsSuccess = createAction(
  'DELETE_ENROLLMENT_SUCCESS',
  (enrollmentId: Enrollment['id']) => ({ enrollmentId })
  );
  
export const deleteEnrollmentsFailure = createAction(
  'DELETE_ENROLLMENT_FAILURE',
  (error: string) => ({ error })
);

export const getEnrollments = createAction('GET_ENROLLMENTS');

export const getEnrollmentsSuccess = createAction(
  'GET_ENROLLMENTS_SUCCESS',
  (enrollments: Enrollment[]) => ({ enrollments })
);

export const getEnrollmentsFailure = createAction(
  'GET_ENROLLMENTS_FAILURE',
  (error: string) => ({ error })
);

export const getEnrollment = createAction(
  'GET_ENROLLMENT',
  (enrollmentId: Enrollment['id']) => ({ enrollmentId })
);

export const getEnrollmentSuccess = createAction(
  'GET_ENROLLMENT_SUCCESS',
  (enrollment: Enrollment) => ({ enrollment })
);

export const getEnrollmentFailure = createAction(
  'GET_ENROLLMENT_FAILURE',
  (error: string) => ({ error })
);