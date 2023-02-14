import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterableType } from 'src/app/interfaces/filterableTypes';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';
import { UserService } from '../users/user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterablesService {
  constructor(private studentService: StudentsService, private coursesService: CoursesService) { }
  private currentService$ = new BehaviorSubject<UserService<any>>(this.studentService);

  private serviceByType: { [key in FilterableType]: UserService<any> } = {
    Student: this.studentService,
    Course: this.coursesService
  };

  public getService(): Observable<UserService<any>> {
    return this.currentService$.asObservable();
  }

  public switchService(service: FilterableType) {
    this.currentService$.next(this.serviceByType[service]);
  }

}
