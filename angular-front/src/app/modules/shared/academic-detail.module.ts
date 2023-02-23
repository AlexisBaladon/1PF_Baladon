import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailComponent } from 'src/app/pages/detail/detail.component';
import { GlobalComponentsModule } from './global-components.module';
import { DirectivesModule } from './directives.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartjsModule } from './libraries/chartjs.module';
import { MaterialModule } from './libraries/material.module';
import { PipesModule } from './pipes.module';

const components = [
  DetailComponent,
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    ChartjsModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [ components ]
})
export class AcademicDetailModule { }
