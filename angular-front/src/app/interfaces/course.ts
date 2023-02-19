import { Filterable } from "../logic/filter/filterable";
import { User } from "../models/users";
import Student from "./student";

export class Course extends Filterable {
    name: string;
    description: string;
    credits: number;
    teacher: User["id"] | null;
    studentsId: Student["id"][];
    averageGrade: number | null;
    icon: string;
    category: string;

    getShownAttributes(): (keyof Course)[] {
        return ['id', 'name', 'description', 'credits', 'category', 'studentsId'];
    }

    constructor(id: Course['id'], name: string, description: string, credits: number, teacher: User["id"] | null, studentsId: Student["id"][], averageGrade: number | null, icon: string, category: string) {
        super(id);
        this.name = name;
        this.description = description;
        this.credits = credits;
        this.teacher = teacher;
        this.studentsId = studentsId;
        this.averageGrade = averageGrade;
        this.icon = icon;
        this.category = category;
    }
}

export function isCourse(filterable: Filterable): filterable is Course {
    return (filterable as Course).teacher !== undefined;
}
