import { Course } from "src/app/interfaces/course";

export interface CourseState {
    courses: Course[];
    selectedCourse: Course | null;
    error: string | null;
}

export interface CourseAction {
    type: CourseTypes;
    courseId: Course["id"];
    course: Course;
    willFilter: boolean;
    courses: Course[];
    error?: string;
}

export type CourseTypes =
    | "GET_COURSES"
    | "ADD_COURSE"
    | "UPDATE_COURSE"
    | "DELETE_COURSE"
