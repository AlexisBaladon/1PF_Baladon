import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { StudentsService } from '../../services/filterables/concrete-data/students/students.service';
import { CoursesService } from '../../services/filterables/concrete-data/courses/courses.service';
import { FilterableContextService } from '../../services/filterables/context/filterableContext.service';
import { AcademicListModule } from '../feature/academic-list/academic-list.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AcademicListModule,
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
    },
    FilterableContextService,
  ]
})
export class ServicesModule { }