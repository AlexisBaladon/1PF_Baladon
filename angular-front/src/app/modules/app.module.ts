import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { ServicesModule } from './core/services.module';
import { RoutesModule } from './routes.module';
import { DirectivesModule } from './shared/directives.module';
import { GlobalComponentsModule } from './shared/global-components.module';
import { AuthModule } from './feature/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer as CourseReducer } from '../store/courses/courses.reducer';
import { reducer as StudentReducer } from '../store/students/students.reducer';
import { reducer as UserReducer } from '../store/users/users.reducer';
import { reducer as EnrollmentReducer } from '../store/enrollments/enrollments.reducer';
import { reducer as AuthReducer } from '../store/auth/auth.reducer';
@NgModule({
  providers: [ ],
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutesModule,
    ServicesModule,
    GlobalComponentsModule,
    DirectivesModule,
    AuthModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({
      auth: AuthReducer,
      courses: CourseReducer,
      students: StudentReducer,
      users: UserReducer,
      enrollments: EnrollmentReducer,
    }, {}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
