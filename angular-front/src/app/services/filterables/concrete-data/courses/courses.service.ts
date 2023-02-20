import { Injectable } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { FilterableDataService } from '../../../filterables/data/filterableData.service';
import * as courses from 'src/assets/data/courses.json';
import { jsonParser, createCourses } from 'src/app/utils/jsonParser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCourseFormComponent } from 'src/app/components/layout/add-course-form-component/add-course-form-component/add-course-form.component';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';

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
