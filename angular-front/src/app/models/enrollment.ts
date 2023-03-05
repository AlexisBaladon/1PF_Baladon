import Student from '../interfaces/student';
import { Course } from '../interfaces/course';
import { Filterable } from '../logic/filter/filterable';
import User from '../interfaces/user';

export class Enrollment extends Filterable {
    studentId: Student['id'];
    courseId: Course['id'];
    grade: number | null;
    enrollmentDate: Date;
    finishDate: Date | null;
    enrollerId: User['id'];

    getShownAttributes(): string[] {
        return [ 'id', 'studentId', 'courseId', 'grade', 'enrollmentDate', 'finishDate' ];
    }

    constructor(id: string, studentId: Student['id'], courseId: Course['id'], grade: number | null, enrollmentDate: Date, finishDate: Date  | null, enrollerId: User['id']) {
        super(id);
        this.id = id;
        this.studentId = studentId;
        this.courseId = courseId;
        this.grade = grade;
        this.enrollmentDate = enrollmentDate;
        this.finishDate = finishDate;
        this.enrollerId = enrollerId;
    }
}

export const isEnrollment = (filterable: Filterable): filterable is Enrollment => {
    return filterable instanceof Enrollment;
}
