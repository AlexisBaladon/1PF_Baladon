import { createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { CourseState } from './courses.types';

export const coursesFeatureKey = 'courses';

const initialState: CourseState = {
  courses: [],
  selectedCourse: null,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(CoursesActions.getCourseSuccess, (state, action) => {
    return {
      ...state,
      courses: [...state.courses, action.course],
      selectedCourse: action.course,
      error: null
    };
  }),

  on(CoursesActions.getCourseFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(CoursesActions.getCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.courses,
      error: null
    };
  }),

  on(CoursesActions.getCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(CoursesActions.createCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: [...state.courses, action.course],
      error: null
    };
  }),

  on(CoursesActions.createCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(CoursesActions.updateCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: state.courses.map(course => {
        if (course.id === action.course.id) {
          return action.course;
        }
        return course;
      }),
      error: null
    };
  }),

  on(CoursesActions.updateCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),

  on(CoursesActions.deleteCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: state.courses.filter(course => course.id !== action.courseId),
      error: null
    };
  }),

  on(CoursesActions.deleteCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  })

);
