import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { StudentsService } from './services/students/students.service';
import { CoursesService } from './services/courses/courses.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FilterPipe,
    {
      provide: StudentsService,
      useFactory: () => new StudentsService(new FilterPipe()),
      deps: [FilterPipe]
    },
    {
      provide: CoursesService,
      useFactory: () => new CoursesService(new FilterPipe()),
      deps: [FilterPipe]
    }
  ]
})
export class ServicesModule { }
