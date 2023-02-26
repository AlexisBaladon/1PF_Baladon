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
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from '../../store/students/students.effects';
import { CoursesEffects } from 'src/app/store/courses/courses.effects';
import { EnrollmentsEffects } from 'src/app/store/enrollments/enrollments.effects';

const routes: Routes = [
  { path: '', component: StudentDashboardComponent },
  { path: ':id', component: StudentDetailComponent },
]

const declarations = [
  StudentDetailComponent,
  StudentDashboardComponent,
  AddUserFormComponent,
]

@NgModule({
  declarations: [ declarations ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AcademicDetailModule,
    AcademicListModule,
    PipesModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
    EffectsModule.forFeature([
      StudentsEffects, 
      CoursesEffects, 
      EnrollmentsEffects
    ]),
  ],
  exports: [ declarations ]
})
export class StudentsModule { }
