import { Course } from '../interfaces/course'
import Student from '../interfaces/student'
import User from '../interfaces/user'

//avoids typescript conversion errors
export function jsonParser<T>(objects: Array<any>): T[] {
    return JSON.parse(JSON.stringify(objects)).default
}

export function createStudent(student: Student): Student {
    return new Student(
        student.id,
        student.name,
        student.surname,
        new Date(student.birthDate),
        student.phone,
        student.city,
        student.email,
        student.password,
        student.admissionDate,
        student.averageGrade,
        student.career,
        student.pictureUrl,
    )
}

export function createStudents(students: Student[]): Student[] {
    return students.map(s => createStudent(s))
}

export function createCourse(course: Course): Course {
    return new Course(
        course.id,
        course.name,
        course.description,
        course.credits,
        course.teacher,
        course.studentsId,
        course.averageGrade,
        course.icon
    )
}

export function createCourses(courses: Course[]): Course[] {
    return courses.map(c => createCourse(c));
}