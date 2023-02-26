import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/interfaces/course';

export const createCourses = createAction(
  'ADD_COURSE',
  (course: Course) => ({ course })
);

export const createCoursesSuccess = createAction(
  'ADD_COURSE_SUCCESS',
  (course: Course) => ({ course })
);

export const createCoursesFailure = createAction(
  'ADD_COURSE_FAILURE',
  (error: string) => ({ error })
);

export const updateCourses = createAction(
  'UPDATE_COURSE',
  (course: Course) => ({ course })
);

export const updateCoursesSuccess = createAction(
  'UPDATE_COURSE_SUCCESS',
  (course: Course) => ({ course })
);

export const updateCoursesFailure = createAction(
  'UPDATE_COURSE_FAILURE',
  (error: string) => ({ error })
);

export const deleteCourses = createAction(
  'DELETE_COURSE',
  (courseId: Course['id']) => ({ courseId })
  );
  
export const deleteCoursesSuccess = createAction(
  'DELETE_COURSE_SUCCESS',
  (courseId: Course['id']) => ({ courseId })
  );
  
export const deleteCoursesFailure = createAction(
  'DELETE_COURSE_FAILURE',
  (error: string) => ({ error })
);

export const getCourses = createAction('GET_COURSES');

export const getCoursesSuccess = createAction(
  'GET_COURSES_SUCCESS',
  (courses: Course[]) => ({ courses })
);

export const getCoursesFailure = createAction(
  'GET_COURSES_FAILURE',
  (error: string) => ({ error })
);

export const getCourse = createAction(
  'GET_COURSE',
  (courseId: Course['id']) => ({ courseId })
);

export const getCourseSuccess = createAction(
  'GET_COURSE_SUCCESS',
  (course: Course) => ({ course })
);

export const getCourseFailure = createAction(
  'GET_COURSE_FAILURE',
  (error: string) => ({ error })
);