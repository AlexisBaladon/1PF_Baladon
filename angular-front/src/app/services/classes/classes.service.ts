import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Student from 'src/app/interfaces/student';
import { CourseClass } from 'src/app/models/courses';
import { jsonParser } from 'src/app/utils/jsonParser';
import * as classes from 'src/assets/data/classes.json';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private classes$: BehaviorSubject<CourseClass[]> = new BehaviorSubject<CourseClass[]>(jsonParser<CourseClass>(classes));

  public getClasses(): Observable<CourseClass[]> {
    return this.classes$.asObservable();
  }

  public addCourseClass(courseClass: CourseClass) {
    let classes = this.classes$.getValue();
    classes.push(courseClass);
    this.classes$.next(classes);
  }

  public removeCourseClass(courseClass: CourseClass) {
    let classes = this.classes$.getValue();
    classes = classes.filter(e => e.id !== courseClass.id);
    this.classes$.next(classes);
  }

  public updateCourseClass(courseClass: CourseClass) {
    let classes = this.classes$.getValue();
    classes = classes.map(e => e.id === courseClass.id ? courseClass : e);
    this.classes$.next(classes);
  }

  public getCourseClass(id: string): CourseClass | undefined {
    return this.classes$.getValue().find(e => e.id === id);
  }

  public getClassesByCourseId(courseId: string): CourseClass[] {
    return this.classes$.getValue().filter(e => e.courseId === courseId);
  }
}
