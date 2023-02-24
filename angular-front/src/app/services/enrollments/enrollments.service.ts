import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enrollment } from 'src/app/models/enrollment';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { FilterableDataService } from '../filterables/data/filterableData.service';
import { createEnrollments } from 'src/app/utils/jsonParser';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService extends FilterableDataService<Enrollment> {
  constructor( filterPipe: FilterPipe, httpClient: HttpClient) {
    super(filterPipe, httpClient, '/api/enrollments');
  }

  protected createData(enrollments: Enrollment[]): Enrollment[] {
    return createEnrollments(enrollments);
  }

  public getEnrollmentsByStudentId(studentId: string): Enrollment[] {
    return this.filterableData$.getValue().filter(e => e.studentId === studentId);
  }

  public getEnrollmentsByCourseId(courseId: string): Enrollment[] {
    return this.filterableData$.getValue().filter(e => e.courseId === courseId);
  }

  public getEnrollmentsByStudentIdAndCourseId(studentId: string, courseId: string): Enrollment | undefined {
    return this.filterableData$.getValue().find(e => e.studentId === studentId && e.courseId === courseId);
  }

}
