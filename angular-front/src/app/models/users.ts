export interface User {
    id: string;
    name: string;
    surname: string;
    password: string;
    email: string;
    birthDate: Date;
    phone: string;
    city: string;
}

export interface Student extends User {
    admissionDate: Date;
    averageGrade: number | null;
    career: string;
}