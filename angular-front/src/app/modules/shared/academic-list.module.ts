import { NgModule } from '@angular/core';

import { DashboardComponent } from 'src/app/components/layout/dashboard/dashboard.component';
import { TableComponent } from 'src/app/components/layout/table/table.component';
import { FiltersComponent } from 'src/app/components/layout/filters/treeFilter/filters.component';
import { AddFilterModalComponent } from 'src/app/components/layout/filters/add-filter-modal/add-filter-modal.component';
import { GlobalComponentsModule } from './global-components.module';
import { DirectivesModule } from './directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './libraries/material.module';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const components = [
  DashboardComponent,
  TableComponent,
  FiltersComponent,
  AddFilterModalComponent,
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
    BrowserAnimationsModule,
  ],
  exports: [ components ]
})
export class AcademicListModule { }
