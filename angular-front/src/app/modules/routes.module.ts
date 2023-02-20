import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../pages/error404/error404.component';
import { StudentDashboardComponent } from '../pages/student-dashboard/student-dashboard.component';
import { CourseDashboardComponent } from '../pages/course-dashboard/course-dashboard.component';
import { StudentDetailComponent } from '../pages/student-detail/student-detail/student-detail.component';
import { CourseDetailComponent } from '../pages/course-detail/course-detail/course-detail.component';

const routes: Routes = [
  { path: 'layout', children: [
      { path: '', redirectTo: 'students', pathMatch: 'full'},
      { path: 'students', component: StudentDashboardComponent },
      { path: 'courses', component: CourseDashboardComponent },
      { path: 'student/:id', component: StudentDetailComponent },
      { path: 'course/:id', component: CourseDetailComponent },
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: Error404Component }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
