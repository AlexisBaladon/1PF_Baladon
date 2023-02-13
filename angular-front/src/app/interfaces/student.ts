import { Filterable } from '../logic/filter/filterable';
import User from './user';

interface Student extends User, Filterable {
    admissionDate: Date;
    averageGrade: number | null;
    career: string;
}

export function isStudent(filter: Filterable): filter is Student {
    return (filter as Student).career !== undefined;
}

export default Student;