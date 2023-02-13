import { Inject, Injectable } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { UserService } from '../users/user.service';
import * as courses from 'src/assets/data/courses.json';
import { jsonParser, courseCreator } from 'src/app/utils/jsonParser';

@Injectable({
  providedIn: 'root',
})
export class CoursesService extends UserService<Course> {

  constructor( filterPipe: FilterPipe) {
    const parsedCourses: Course[] = jsonParser<Course>(courses);
    const filterableData: Course[] = courseCreator(parsedCourses);
    super(filterPipe, filterableData);
   }
}
