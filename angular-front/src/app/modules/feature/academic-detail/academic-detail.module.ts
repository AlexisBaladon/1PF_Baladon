import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailComponent } from 'src/app/pages/student-detail/student-detail/student-detail.component';
import { CourseDetailComponent } from 'src/app/pages/course-detail/course-detail/course-detail.component';
import { DetailComponent } from 'src/app/pages/detail/detail.component';
import { GlobalComponentsModule } from '../../shared/global-components/global-components.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from '../../shared/libraries/chartjs.module';
import { MaterialModule } from '../../shared/libraries/material.module';
import { PipesModule } from '../../shared/pipes/pipes.module';

const components = [
  DetailComponent,
  StudentDetailComponent,
  CourseDetailComponent,
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    ChartjsModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [ components ]
})
export class AcademicDetailModule { }
