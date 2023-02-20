import { NgModule } from '@angular/core';

import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { TableComponent } from 'src/app/components/layout/table/table.component';
import { FiltersComponent } from 'src/app/components/layout/filters/treeFilter/filters.component';
import { AddFilterModalComponent } from 'src/app/components/layout/filters/add-filter-modal/add-filter-modal.component';
import { AddUserFormComponent } from 'src/app/components/layout/add-user-form/add-user-form.component';
import { AddCourseFormComponent } from 'src/app/components/layout/add-course-form-component/add-course-form-component/add-course-form.component';
import { StudentDashboardComponent } from 'src/app/pages/student-dashboard/student-dashboard.component';
import { CourseDashboardComponent } from 'src/app/pages/course-dashboard/course-dashboard.component';
import { GlobalComponentsModule } from '../../shared/global-components/global-components.module';
import { DirectivesModule } from '../../shared/directives/directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/libraries/material.module';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const components = [
  DashboardComponent,
  StudentDashboardComponent,
  CourseDashboardComponent,
  TableComponent,
  FiltersComponent,
  AddFilterModalComponent,
  AddUserFormComponent,
  AddCourseFormComponent,
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
    BrowserAnimationsModule,
  ],
  exports: [ components ]
})
export class AcademicListModule { }
