import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { ServicesModule } from './core/services.module';
import { AcademicDetailModule } from './feature/academic-detail/academic-detail.module';
import { AcademicListModule } from './feature/academic-list/academic-list.module';
import { AuthModule } from './feature/auth/auth.module';
import { RoutesModule } from './routes.module';
import { DirectivesModule } from './shared/directives/directives.module';
import { GlobalComponentsModule } from './shared/global-components/global-components.module';

@NgModule({
  providers: [
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RoutesModule,
    ServicesModule,
    GlobalComponentsModule,
    DirectivesModule,
    AcademicDetailModule,
    AcademicListModule,
    AuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
