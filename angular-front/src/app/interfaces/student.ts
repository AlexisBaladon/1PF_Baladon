import User from './user';

interface Student extends User {
    admissionDate: Date;
    averageGrade: number;
    career: string;
}

export default Student;