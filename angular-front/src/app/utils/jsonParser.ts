import { Course } from '../interfaces/course'
import Student from '../interfaces/student'

//avoids typescript conversion errors
export function jsonParser<T>(objects: Array<any>): T[] {
    return JSON.parse(JSON.stringify(objects)).default
}

export function studentCreator(students: Student[]): Student[] {
    return students.map(s => new Student(
        s.id,
        s.name,
        s.surname,
        new Date(s.birthDate),
        s.phone,
        s.city,
        s.email,
        s.password,
        s.admissionDate,
        s.averageGrade,
        s.career,
        s.pictureUrl,
    ))
}

export function courseCreator(courses: Course[]): Course[] {
    return courses.map(c => new Course(
        c.id,
        c.name,
        c.description,
        c.credits,
        c.teacher,
        c.studentsId,
        c.averageGrade,
        c.icon
    ))
}