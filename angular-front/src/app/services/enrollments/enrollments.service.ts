import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  private enrollments$: BehaviorSubject<Enrollment[]> = new BehaviorSubject<Enrollment[]>([]);

  public getEnrollments(): Observable<Enrollment[]> {
    return this.enrollments$.asObservable();
  }

  public addEnrollment(enrollment: Enrollment) {
    let enrollments = this.enrollments$.getValue();
    enrollments.push(enrollment);
    this.enrollments$.next(enrollments);
  }

  public removeEnrollment(enrollment: Enrollment) {
    let enrollments = this.enrollments$.getValue();
    enrollments = enrollments.filter(e => e.id !== enrollment.id);
    this.enrollments$.next(enrollments);
  }

  public updateEnrollment(enrollment: Enrollment) {
    let enrollments = this.enrollments$.getValue();
    enrollments = enrollments.map(e => e.id === enrollment.id ? enrollment : e);
    this.enrollments$.next(enrollments);
  }

  public getEnrollment(id: string): Enrollment | undefined {
    return this.enrollments$.getValue().find(e => e.id === id);
  }

  public getEnrollmentsByStudentId(studentId: string): Enrollment[] {
    return this.enrollments$.getValue().filter(e => e.studentId === studentId);
  }

  public getEnrollmentsByCourseId(courseId: string): Enrollment[] {
    return this.enrollments$.getValue().filter(e => e.courseId === courseId);
  }

  public getEnrollmentsByStudentIdAndCourseId(studentId: string, courseId: string): Enrollment | undefined {
    return this.enrollments$.getValue().find(e => e.studentId === studentId && e.courseId === courseId);
  }

}
