import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from '../pages/error404/error404.component';
import { AuthGuard } from '../guards/auth-guard.guard';
import { AdminGuard } from '../guards/admin-guard.guard';

const routes: Routes = [
  { path: 'layout', children: [
      { path: '', redirectTo: 'students', pathMatch: 'full'},
      { path: 'students',  canActivate: [AuthGuard], loadChildren: () => import('./feature/students.module').then(m => m.StudentsModule) },
      { path: 'courses', canActivate: [AuthGuard], loadChildren: () => import('./feature/courses.module').then(m => m.CoursesModule) },
      { path: 'users', canActivate: [AuthGuard, AdminGuard], loadChildren: () => import('./feature/users.module').then(m => m.UsersModule) },
      { path: 'enrollments', canActivate: [AuthGuard], loadChildren: () => import('./feature/enrollments.module').then(m => m.EnrollmentsModule) },
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./feature/auth.module').then(m => m.AuthModule) },
  { path: '**', component: Error404Component },
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
