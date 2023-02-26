import { createReducer, on } from '@ngrx/store';
import * as StudentsActions from './students.actions';
import { StudentState } from './students.types';

export const studentsFeatureKey = 'students';

const initialState: StudentState = {
  students: [],
  selectedStudent: null,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(StudentsActions.getStudentSuccess, (state, action) => {
    return {
      ...state,
      students: [...state.students, action.student],
      selectedStudent: action.student,
      error: null
    };
  }),

  on(StudentsActions.getStudentFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(StudentsActions.getStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: action.students,
      error: null
    };
  }),

  on(StudentsActions.getStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(StudentsActions.createStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: [...state.students, action.student],
      error: null
    };
  }),

  on(StudentsActions.createStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(StudentsActions.updateStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: state.students.map(student => {
        if (student.id === action.student.id) {
          return action.student;
        }
        return student;
      }),
      error: null
    };
  }),

  on(StudentsActions.updateStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(StudentsActions.deleteStudentSuccess, (state, action) => {
    return {
      ...state,
      students: state.students.filter(student => student.id !== action.studentId),
      error: null
    };
  }),

  on(StudentsActions.deleteStudentFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })

);
