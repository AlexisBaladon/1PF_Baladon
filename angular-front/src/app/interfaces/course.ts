import { Filterable } from "../logic/filter/filterable";
import { User } from "../models/users";

export interface Course extends Filterable {
    id: number;
    name: string;
    description: string;
    credits: number;
    teacher: User["id"];
    studentsId: number[];
}

export function isCourse(filterable: Filterable): filterable is Course {
    return (filterable as Course).teacher !== undefined;
}
