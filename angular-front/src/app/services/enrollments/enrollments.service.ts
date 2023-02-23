import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollment';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { createEnrollments, jsonParser } from 'src/app/utils/jsonParser';
import * as enrollments from 'src/assets/data/enrollments.json';
import { FilterableDataService } from '../filterables/data/filterableData.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService extends FilterableDataService<Enrollment> {
  constructor( filterPipe: FilterPipe ) {
    const parsedEnrollments: Enrollment[] = jsonParser<Enrollment>(enrollments);
    const filterableData: Enrollment[] = createEnrollments(parsedEnrollments);
    super(filterPipe, filterableData);
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
