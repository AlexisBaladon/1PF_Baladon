import { Filterable } from "../logic/filter/filterable";
import { User } from "../models/users";

export class Course extends Filterable {
    name: string;
    description: string;
    credits: number;
    teacher: User["id"];
    studentsId: number[];
    averageGrade: number;

    getShownAttributes(): (keyof Course)[] {
        return ['id', 'name', 'description', 'credits', 'teacher', 'studentsId', 'averageGrade'];
    }

    constructor(id: Course['id'], name: string, description: string, credits: number, teacher: User["id"], studentsId: number[], averageGrade: number) {
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
