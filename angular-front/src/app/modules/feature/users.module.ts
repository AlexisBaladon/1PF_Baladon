import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademicDetailModule } from '../shared/academic-detail.module';
import { AcademicListModule } from '../shared/academic-list.module';
import { GlobalComponentsModule } from '../shared/global-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../shared/directives.module';
import { MaterialModule } from '../shared/libraries/material.module';
import { PipesModule } from '../shared/pipes.module';
import { UserDetailComponent } from '../../pages/user-detail/user-detail.component';
import { UserDashboardComponent } from '../../pages/user-dashboard/user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from '../../store/users/users.effects';

const routes: Routes = [
  { path: '', component: UserDashboardComponent },
  { path: ':id', component: UserDetailComponent },
]

const components = [
  UserDetailComponent,
  UserDashboardComponent,
]
@NgModule({
  declarations: components,
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
    EffectsModule.forFeature([UsersEffects]),
  ],
  exports: components
})
export class UsersModule { }
