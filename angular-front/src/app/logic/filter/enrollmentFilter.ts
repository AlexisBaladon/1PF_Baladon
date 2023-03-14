import { Enrollment, isEnrollment } from "src/app/models/enrollment";
import { Filter } from "./filter";
import { Filterable } from "./filterable";


export abstract class EnrollmentFilter extends Filter {
    isValidType(filterable: Filterable): boolean {
        return isEnrollment(filterable);
    }
}

export class EnrollmentStudentIdFilter extends EnrollmentFilter {
    private studentId: string;
    
    constructor(studentId: string) {
        super();
        this.studentId = studentId;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.isValidType(filterable) && 
        (filterable as Enrollment).studentId.toLowerCase().includes(this.studentId.trim().toLowerCase());
    }
}

export class EnrollmentCourseIdFilter extends EnrollmentFilter {
    private courseId: string;
    
    constructor(courseId: string) {
        super();
        this.courseId = courseId;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.isValidType(filterable) && 
        (filterable as Enrollment).courseId.toLowerCase().includes(this.courseId.trim().toLowerCase());
    }
}

export class EnrollmentGradeFilter extends EnrollmentFilter {
    private grade: number;
    
    constructor(grade: number) {
        super();
        this.grade = grade;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.isValidType(filterable) && 
        (filterable as Enrollment).grade === this.grade;
    }
}