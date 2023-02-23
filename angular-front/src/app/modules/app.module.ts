import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { ServicesModule } from './core/services.module';
import { CoursesModule } from './feature/courses.module';
import { StudentsModule } from './feature/students.module';
import { UsersModule } from './feature/users.module';
import { AuthModule } from './feature/auth.module';
import { RoutesModule } from './routes.module';
import { DirectivesModule } from './shared/directives.module';
import { GlobalComponentsModule } from './shared/global-components.module';
import { EnrollmentsModule } from './feature/enrollments.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  providers: [ ],
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RoutesModule,
    ServicesModule,
    GlobalComponentsModule,
    DirectivesModule,
    UsersModule,
    StudentsModule,
    CoursesModule,
    AuthModule,
    EnrollmentsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
