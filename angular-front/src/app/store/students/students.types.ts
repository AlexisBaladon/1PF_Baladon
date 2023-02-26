import Student from "src/app/interfaces/student";

export interface StudentState {
    students: Student[];
    selectedStudent: Student | null;
    error: string | null;
}

export interface StudentAction {
    type: StudentTypes;
    studentId: Student["id"];
    student: Student;
    willFilter: boolean;
    students: Student[];
    error?: string;
}

export type StudentTypes =
    | "GET_STUDENTS"
    | "ADD_STUDENT"
    | "UPDATE_STUDENT"
    | "DELETE_STUDENT"
