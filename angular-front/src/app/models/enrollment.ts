import Student from '../interfaces/student';
import { Course } from '../interfaces/course';

export interface Enrollment {
    id: string;
    studentId: Student['id'];
    courseId: Course['id'];
    finished: boolean;
    grade: number;
    enrollmentDate: Date;
    finishDate: string;
}
