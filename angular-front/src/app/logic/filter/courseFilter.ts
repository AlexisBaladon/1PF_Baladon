import { isCourse, type Course } from "src/app/interfaces/course";
import { Filter } from "./filter";
import { Filterable } from "./filterable";
import { StudentFilter } from "./studentFilter";


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
        (filterable as Course).name.toLowerCase().includes(this.name.toLowerCase());
    }
}

export class CourseAmountFilter extends CourseFilter {
    amountStudents: number;

    constructor(amountStudents: number) {
        super();
        this.amountStudents = amountStudents;
    }

    public evaluate(filterable: Filterable): boolean {
        const amountStudents = (filterable as Course).studentsId.length;
        return this.isValidType(filterable) &&  amountStudents >= this.amountStudents;
    }
}