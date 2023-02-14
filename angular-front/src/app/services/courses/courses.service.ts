import { Injectable } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { FilterPipe } from 'src/app/pipes/filter/filter.pipe';
import { UserService } from '../users/user.service';
import * as courses from 'src/assets/data/courses.json';
import { jsonParser, courseCreator } from 'src/app/utils/jsonParser';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCourseFormComponent } from 'src/app/components/layout/add-course-form-component/add-course-form-component/add-course-form.component';

@Injectable({
  providedIn: 'root',
})
export class CoursesService extends UserService<Course> {

  constructor( filterPipe: FilterPipe ) {
    const parsedCourses: Course[] = jsonParser<Course>(courses);
    const filterableData: Course[] = courseCreator(parsedCourses);
    super(filterPipe, filterableData);
   }

  public openEditDialog(dialog: MatDialog, mode: 'create' | 'edit', filterable: Partial<Course>, width?: string | undefined): MatDialogRef<AddCourseFormComponent, any> {
      return dialog.open(AddCourseFormComponent, {
          width: width || '600px',
          data: { 
            course: filterable, 
            valid: true, 
            title: mode === 'create' ? 'Agregar curso' : 'Editar curso',
          }
      });
  }

}
