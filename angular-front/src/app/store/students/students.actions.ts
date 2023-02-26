import { createAction, props } from '@ngrx/store';
import Student from 'src/app/interfaces/student';

export const createStudents = createAction(
  'ADD_STUDENT',
  (student: Student) => ({ student })
);

export const createStudentsSuccess = createAction(
  'ADD_STUDENT_SUCCESS',
  (student: Student) => ({ student })
);

export const createStudentsFailure = createAction(
  'ADD_STUDENT_FAILURE',
  (error: string) => ({ error })
);

export const updateStudents = createAction(
  'UPDATE_STUDENT',
  (student: Student) => ({ student })
);

export const updateStudentsSuccess = createAction(
  'UPDATE_STUDENT_SUCCESS',
  (student: Student) => ({ student })
);

export const updateStudentsFailure = createAction(
  'UPDATE_STUDENT_FAILURE',
  (error: string) => ({ error })
);

export const deleteStudents = createAction(
  'DELETE_STUDENT',
  (studentId: Student['id']) => ({ studentId })
  );
  
export const deleteStudentsSuccess = createAction(
  'DELETE_STUDENT_SUCCESS',
  (studentId: Student['id']) => ({ studentId })
  );
  
export const deleteStudentsFailure = createAction(
  'DELETE_STUDENT_FAILURE',
  (error: string) => ({ error })
);

export const getStudents = createAction('GET_STUDENTS');

export const getStudentsSuccess = createAction(
  'GET_STUDENTS_SUCCESS',
  (students: Student[]) => ({ students })
);

export const getStudentsFailure = createAction(
  'GET_STUDENTS_FAILURE',
  (error: string) => ({ error })
);

export const getStudent = createAction(
  'GET_STUDENT',
  (studentId: Student['id']) => ({ studentId })
);

export const getStudentSuccess = createAction(
  'GET_STUDENT_SUCCESS',
  (student: Student) => ({ student })
);

export const getStudentFailure = createAction(
  'GET_STUDENT_FAILURE',
  (error: string) => ({ error })
);