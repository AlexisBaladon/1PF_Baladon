import User from './user';

interface Student extends User {
    averageGrade: number;
    career: string;
}

export default Student;