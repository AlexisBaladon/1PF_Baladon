import type Student from "src/app/interfaces/student";
import { isStudent } from "src/app/interfaces/student";
import { Filter } from "./filter";
import { Filterable } from "./filterable";


export abstract class StudentFilter extends Filter {
    isValidType(filterable: Filterable): boolean {
        return isStudent(filterable);
    }
}

export class StudentNameFilter extends StudentFilter {
    private name: string;
    
    constructor(name: string) {
        super();
        this.name = name;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.isValidType(filterable) && 
        (filterable as Student).name.toLowerCase().includes(this.name.toLowerCase());
    }
}

export class StudentGradeFilter extends StudentFilter {
    grade: number;

    constructor(grade: number) {
        super();
        this.grade = grade;
    }

    public evaluate(filterable: Filterable): boolean {
        const averageGrade = (filterable as Student).averageGrade;
        return this.isValidType(filterable) && 
        averageGrade !== null &&
        averageGrade >= this.grade;
    }
}