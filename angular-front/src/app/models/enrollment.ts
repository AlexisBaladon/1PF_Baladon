import Student from '../interfaces/student';
import { Course } from '../interfaces/course';
import { Filterable } from '../logic/filter/filterable';

export class Enrollment extends Filterable {
    studentId: Student['id'];
    courseId: Course['id'];
    grade: number;
    enrollmentDate: Date;
    finishDate: string;

    getShownAttributes(): string[] {
        return [ 'id', 'studentId', 'courseId', 'grade', 'enrollmentDate', 'finishDate' ];
    }

    constructor(id: string, studentId: Student['id'], courseId: Course['id'], grade: number, enrollmentDate: Date, finishDate: string) {
        super(id);
        this.id = id;
        this.studentId = studentId;
        this.courseId = courseId;
        this.grade = grade;
        this.enrollmentDate = enrollmentDate;
        this.finishDate = finishDate;
    }
}
