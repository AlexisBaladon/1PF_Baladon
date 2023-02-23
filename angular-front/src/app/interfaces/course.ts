import { Filterable } from "../logic/filter/filterable";

export class Course extends Filterable {
    name: string;
    description: string;
    credits: number;
    averageGrade: number | null;
    icon: string;
    category: string;

    getShownAttributes(): (keyof Course)[] {
        return ['id', 'name', 'description', 'credits', 'category'];
    }

    constructor(id: Course['id'], name: string, description: string, credits: number, averageGrade: number | null, icon: string, category: string) {
        super(id);
        this.name = name;
        this.description = description;
        this.credits = credits;
        this.averageGrade = averageGrade;
        this.icon = icon;
        this.category = category;
    }
}

export function isCourse(filterable: Filterable): filterable is Course {
    return (filterable as Course).category !== undefined;
}
