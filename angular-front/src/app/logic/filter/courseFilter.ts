import { isCourse, type Course } from "src/app/interfaces/course";
import { Filter } from "./filter";
import { Filterable } from "./filterable";


export abstract class CourseFilter extends Filter {
    isValidType(filterable: Filterable): boolean {
        return isCourse(filterable);
    }
}

export class CourseNameFilter extends CourseFilter {
    private name: string;
    
    constructor(name: string) {
        super();
        this.name = name;
    }

    public evaluate(filterable: Filterable): boolean {
        return this.isValidType(filterable) && 
        (filterable as Course).name.trim().toLowerCase().includes(this.name.trim().toLowerCase());
    }
}

export class CourseAmountFilter extends CourseFilter {
    amountStudents: number;

    constructor(amountStudents: number) {
        super();
        this.amountStudents = amountStudents;
    }

    public evaluate(filterable: Filterable): boolean {
        const amountStudents = 3; //TODO: get amount of students from backend
        return this.isValidType(filterable) &&  amountStudents >= this.amountStudents;
    }
}