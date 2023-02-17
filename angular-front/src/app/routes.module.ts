import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { CourseDashboardComponent } from './pages/course-dashboard/course-dashboard.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { Error404Component } from './pages/error404/error404.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'layout', children: [
      { path: 'students', component: StudentDashboardComponent }, 
      { path: 'courses', component: CourseDashboardComponent },
      { path: 'course/:id', component: CourseDetailComponent },
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: Error404Component }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutesModule { }
