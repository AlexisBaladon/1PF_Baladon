import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TableComponent } from './components/table/table.component';
import { IconComponent } from './components/widget/icon/icon.component';
import { FiltersComponent } from './components/filters/filters.component';
import { InRangeStyleDirective } from './directives/in-range-style.directive';
import { LoginComponent } from './pages/login/login.component';
import { ToastComponent } from './components/global/toast/toast.component';

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
    LoginComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
