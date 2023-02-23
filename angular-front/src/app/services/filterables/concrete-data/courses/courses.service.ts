import { Injectable } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { FilterableDataService } from '../../../filterables/data/filterableData.service';
import * as courses from 'src/assets/data/courses.json';
import { jsonParser, createCourses } from 'src/app/utils/jsonParser';

@Injectable({
  providedIn: 'root',
})
export class CoursesService extends FilterableDataService<Course> {

  constructor( filterPipe: FilterPipe ) {
    const parsedCourses: Course[] = jsonParser<Course>(courses);
    const filterableData: Course[] = createCourses(parsedCourses);
    super(filterPipe, filterableData);
   }

}
