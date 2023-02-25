import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '../shared/directives.module';
import { GlobalComponentsModule } from '../shared/global-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentDashboardComponent } from '../../pages/enrollment-dashboard/enrollment-dashboard.component';
import { AcademicDetailModule } from '../shared/academic-detail.module';
import { AcademicListModule } from '../shared/academic-list.module';
import { MaterialModule } from '../shared/libraries/material.module';
import { PipesModule } from '../shared/pipes.module';
import { EnrollmentDetailComponent } from 'src/app/pages/enrollment-detail/enrollment-detail.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: EnrollmentDashboardComponent },
  { path: ':id', component: EnrollmentDetailComponent },
]

const components = [
  EnrollmentDashboardComponent,
  EnrollmentDetailComponent,
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AcademicDetailModule,
    AcademicListModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [ components ]
})
export class EnrollmentsModule { }
