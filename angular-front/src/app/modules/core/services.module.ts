import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../pipes/filter/filter.pipe';
import { StudentsService } from '../../services/filterables/concrete-data/students/students.service';
import { CoursesService } from '../../services/filterables/concrete-data/courses/courses.service';
import { FilterableContextService } from '../../services/filterables/context/filterableContext.service';
import { AcademicListModule } from '../shared/academic-list.module';
import { UsersService } from 'src/app/services/users/users.service';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../shared/pipes.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AcademicListModule,
    HttpClientModule,
    PipesModule,
  ],
  providers: [
    FilterPipe,
    {
      provide: StudentsService,
    },
    {
      provide: CoursesService,
    },
    {
      provide: UsersService,
    },
    FilterPipe,
    UsersService,
    FilterableContextService,
  ]
})
export class ServicesModule { }
