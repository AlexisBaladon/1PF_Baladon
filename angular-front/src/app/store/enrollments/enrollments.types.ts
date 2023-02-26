import { Enrollment } from "src/app/models/enrollment";

export interface EnrollmentState {
    enrollments: Enrollment[];
    selectedEnrollment: Enrollment | null;
    error: string | null;
}

export interface EnrollmentAction {
    type: EnrollmentTypes;
    enrollmentId: Enrollment["id"];
    enrollment: Enrollment;
    willFilter: boolean;
    enrollments: Enrollment[];
    error?: string;
}

export type EnrollmentTypes =
    | "GET_ENROLLMENTS"
    | "ADD_ENROLLMENT"
    | "UPDATE_ENROLLMENT"
    | "DELETE_ENROLLMENT"
