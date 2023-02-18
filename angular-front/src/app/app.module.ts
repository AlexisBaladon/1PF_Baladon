import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/global/toolbar/toolbar.component';
import { MenuComponent } from './components/global/menu/menu.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { TableComponent } from './components/layout/table/table.component';
import { IconComponent } from './components/widget/icon/icon.component';
import { FiltersComponent } from './components/layout/filters/treeFilter/filters.component';
import { InRangeStyleDirective } from './directives/in-range-style/in-range-style.directive';
import { AuthComponent } from './pages/auth/auth.component';
import { ToastComponent } from './components/global/toast/toast.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AddFilterModalComponent } from './components/layout/filters/add-filter-modal/add-filter-modal.component';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { AddUserFormComponent } from './components/layout/add-user-form/add-user-form.component';
import { ConfirmModalComponent } from './components/global/confirm-modal/confirm-modal.component';
import { ValidInputDirective } from './directives/valid-input/valid-input.directive';
import { FullNamePipe } from './pipes/users/full-name/full-name.pipe';
import { FontSizeDirective } from './directives/fonts/size/font-size.directive';
import { ServicesModule } from './services.module';
import { AddCourseFormComponent } from './components/layout/add-course-form-component/add-course-form-component/add-course-form.component';
import { RoutesModule } from './routes.module';
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { CourseDashboardComponent } from './pages/course-dashboard/course-dashboard.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { Error404Component } from './pages/error404/error404.component';
import { CustomBackgroundDirective } from './directives/custom-background/custom-background.directive';
import { SectionHeaderComponent } from './components/global/section-header/section-header.component';
import { CardComponent } from './components/global/card/card/card.component';
import { ChartjsModule } from './chartjs.module';
import { ChartComponent } from './components/global/chart/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    DashboardComponent,
    TableComponent,
    IconComponent,
    FiltersComponent,
    InRangeStyleDirective,
    AuthComponent,
    ToastComponent,
    AddFilterModalComponent,
    FilterPipe,
    AddUserFormComponent,
    ConfirmModalComponent,
    ValidInputDirective,
    FullNamePipe,
    FontSizeDirective,
    AddCourseFormComponent,
    StudentDashboardComponent,
    CourseDashboardComponent,
    CourseDetailComponent,
    Error404Component,
    CustomBackgroundDirective,
    SectionHeaderComponent,
    CardComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServicesModule,
    RoutesModule,
    ChartjsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
