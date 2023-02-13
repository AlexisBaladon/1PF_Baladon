import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './users/user.service';
import { FilterPipe } from '../pipes/filter/filter.pipe';

import Student from 'src/app/interfaces/student';
import { Course } from '../interfaces/course';
import { jsonParser, studentCreator } from 'src/app/utils/jsonParser';
import * as students from 'src/assets/data/students.json';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: 'filterableType', useValue: 'Student' },
    {
      provide: UserService, useFactory: (filterableType: string) => {
        if (filterableType === 'Student') {
          const studentData = jsonParser<Student>(students);
          return new UserService<Student>(new FilterPipe(), studentCreator(studentData));
        }
        return new UserService<Course>(new FilterPipe(), jsonParser<Course>(students)); //course
      },
      deps: ['filterableType']
    }
  ]
})
export class ServicesModule { }
