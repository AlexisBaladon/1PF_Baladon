import { Filterable } from '../logic/filter/filterable';
import User from './user';

class Student extends Filterable {
    name: string;
    surname: string;
    birthDate: Date;
    phone: string;
    city: string;
    email: string;
    password: string;
    admissionDate: Date;
    averageGrade: number | null;
    career: string;
    pictureUrl: string;
    
    getShownAttributes(): (Partial<keyof Student>)[] {
        return ['id', 'name', 'email', 'career', 'admissionDate', 'averageGrade']
    }

    constructor(id: string, name: string, surname: string, birthDate: Date, phone: string, city: string, email: string, password: string, admissionDate: Date, averageGrade: number | null, career: string, pictureUrl: string) {
        super(id);
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.phone = phone;
        this.city = city;
        this.email = email;
        this.password = password;
        this.admissionDate = admissionDate;
        this.averageGrade = averageGrade;
        this.career = career;
        this.pictureUrl = pictureUrl;
    }
    
}

export function isStudent(filter: Filterable): filter is Student {
    return (filter as Student).career !== undefined;
}

export default Student;