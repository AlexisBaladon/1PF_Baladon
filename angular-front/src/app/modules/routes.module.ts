import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../pages/error404/error404.component';
import { StudentDashboardComponent } from '../pages/student-dashboard/student-dashboard.component';
import { CourseDashboardComponent } from '../pages/course-dashboard/course-dashboard.component';
import { StudentDetailComponent } from '../pages/student-detail/student-detail/student-detail.component';
import { CourseDetailComponent } from '../pages/course-detail/course-detail/course-detail.component';
import { AuthComponent } from '../pages/auth/auth.component';
import { UserDashboardComponent } from '../pages/user-dashboard/user-dashboard.component';
import { UserDetailComponent } from '../pages/user-detail/user-detail.component';
import { EnrollmentDashboardComponent } from '../pages/enrollment-dashboard/enrollment-dashboard.component';
import { EnrollmentDetailComponent } from '../pages/enrollment-detail/enrollment-detail.component';

const routes: Routes = [
  { path: 'layout', children: [
      { path: '', redirectTo: 'students', pathMatch: 'full'},
      { path: 'students', component: StudentDashboardComponent },
      { path: 'courses', component: CourseDashboardComponent },
      { path: 'users', component: UserDashboardComponent },
      { path: 'enrollments', component: EnrollmentDashboardComponent },
      { path: 'student/:id', component: StudentDetailComponent },
      { path: 'course/:id', component: CourseDetailComponent },
      { path: 'enrollment/:id', component: EnrollmentDetailComponent},
      { path: 'user/:id', component: UserDetailComponent }
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
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
