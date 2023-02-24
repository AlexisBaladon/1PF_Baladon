import { Filterable } from '../logic/filter/filterable';

class Student extends Filterable {
    email: string;
    name: string;
    surname: string;
    direction: string;
    phone: string;
    admissionDate: Date;
    averageGrade: number | null;
    career: string;
    pictureUrl: string;
    
    getShownAttributes(): (Partial<keyof Student>)[] {
        return ['id', 'name', 'email', 'career', 'admissionDate', 'averageGrade']
    }

    constructor(id: string, name: string, surname: string, phone: string, direction: string, email: string, admissionDate: Date, averageGrade: number | null, career: string, pictureUrl: string) {
        super(id);
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.direction = direction;
        this.email = email;
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