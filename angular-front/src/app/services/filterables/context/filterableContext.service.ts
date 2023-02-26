import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterableType } from 'src/app/interfaces/filterableTypes';
import { CoursesService } from '../../filterables/concrete-data/courses/courses.service';
import { StudentsService } from '../concrete-data/students/students.service';
import { FilterableDataService } from '../data/filterableData.service';
import { BehaviorSubject } from 'rxjs';
import { UsersService } from '../../users/users.service';
import { EnrollmentsService } from '../../enrollments/enrollments.service';

//redux
import { selectCourses } from 'src/app/store/courses/courses.selectors';

@Injectable({
  providedIn: 'root'
})
export class FilterableContextService {
  constructor(
    private studentService: StudentsService, 
    private coursesService: CoursesService,
    private usersService: UsersService,
    private enrollmentsService: EnrollmentsService,
  ) { }

  private currentService$ = new BehaviorSubject<FilterableDataService<any>>(this.studentService);

  private serviceByType: { [key in FilterableType]: FilterableDataService<any> } = {
    Student: this.studentService,
    Course: this.coursesService,
    User: this.usersService,
    Enrollment: this.enrollmentsService,
  };

  public getService(): Observable<FilterableDataService<any>> {
    return this.currentService$.asObservable();
  }

  public switchService(service: FilterableType) {
    this.currentService$.next(this.serviceByType[service]);
  }

}
