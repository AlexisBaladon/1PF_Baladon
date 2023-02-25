import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicDetailModule } from '../shared/academic-detail.module';
import { AcademicListModule } from '../shared/academic-list.module';
import { CourseDashboardComponent } from 'src/app/pages/course-dashboard/course-dashboard.component';
import { AddCourseFormComponent } from 'src/app/components/layout/add-course-form-component/add-course-form-component/add-course-form.component';
import { CourseDetailComponent } from 'src/app/pages/course-detail/course-detail/course-detail.component';
import { GlobalComponentsModule } from '../shared/global-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../shared/directives.module';
import { MaterialModule } from '../shared/libraries/material.module';
import { PipesModule } from '../shared/pipes.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CourseDashboardComponent },
  { path: ':id', component: CourseDetailComponent },
]

const declarations = [
  CourseDashboardComponent,
  CourseDetailComponent,
  AddCourseFormComponent,
]

@NgModule({
  declarations: [ declarations ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AcademicDetailModule,
    AcademicListModule,
    AcademicDetailModule,
    AcademicListModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [ declarations ]
})
export class CoursesModule { }
