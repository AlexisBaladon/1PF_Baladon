import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { StudentDashboardComponent } from './components/layout/student-dashboard/student-dashboard.component';
import { CourseDashboardComponent } from './components/layout/course-dashboard/course-dashboard.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'layout', children: [
      { path: 'students', component: StudentDashboardComponent, children: [
          { path: ':id', component: DashboardComponent }
      ] }, 
      { path: 'courses', component: CourseDashboardComponent, children: [
          { path: ':id', component: DashboardComponent }
      ] }
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
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
