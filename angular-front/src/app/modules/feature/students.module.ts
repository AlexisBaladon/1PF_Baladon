import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicDetailModule } from '../shared/academic-detail.module';
import { AcademicListModule } from '../shared/academic-list.module';
import { StudentDashboardComponent } from 'src/app/pages/student-dashboard/student-dashboard.component';
import { StudentDetailComponent } from 'src/app/pages/student-detail/student-detail/student-detail.component';
import { AddUserFormComponent } from 'src/app/components/layout/add-user-form/add-user-form.component';
import { PipesModule } from '../shared/pipes.module';
import { GlobalComponentsModule } from '../shared/global-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../shared/directives.module';
import { MaterialModule } from '../shared/libraries/material.module';

const declarations = [
  StudentDetailComponent,
  StudentDashboardComponent,
  AddUserFormComponent,
]

@NgModule({
  declarations: [ declarations ],
  imports: [
    CommonModule,
    AcademicDetailModule,
    AcademicListModule,
    PipesModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [ declarations ]
})
export class StudentsModule { }
