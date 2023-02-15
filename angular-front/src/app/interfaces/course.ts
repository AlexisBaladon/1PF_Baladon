import { Filterable } from "../logic/filter/filterable";
import { User } from "../models/users";

export class Course extends Filterable {
    name: string;
    description: string;
    credits: number;
    teacher: User["id"] | null;
    studentsId: number[];
    averageGrade: number | null;

    getShownAttributes(): (keyof Course)[] {
        return ['id', 'name', 'description', 'credits', 'studentsId'];
    }

    constructor(id: Course['id'], name: string, description: string, credits: number, teacher: User["id"] | null, studentsId: number[], averageGrade: number | null) {
        super(id);
        this.name = name;
        this.description = description;
        this.credits = credits;
        this.teacher = teacher;
        this.studentsId = studentsId;
        this.averageGrade = averageGrade;
    }
}

export function isCourse(filterable: Filterable): filterable is Course {
    return (filterable as Course).teacher !== undefined;
}
