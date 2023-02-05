import User from './user';

interface Student extends User {
    admissionDate: Date;
    averageGrade: number | null;
    career: string;
}

export default Student;