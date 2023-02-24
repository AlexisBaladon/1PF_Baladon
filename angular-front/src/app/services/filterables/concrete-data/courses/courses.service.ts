import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { FilterableDataService } from '../../../filterables/data/filterableData.service';
import { createCourses } from 'src/app/utils/jsonParser';

@Injectable({
  providedIn: 'root',
})
export class CoursesService extends FilterableDataService<Course> {

  constructor( filterPipe: FilterPipe, httpClient: HttpClient) {
    super(filterPipe, httpClient, '/api/courses');
  }

  protected createData(courses: Course[]): Course[] {
    return createCourses(courses);
  }

}
