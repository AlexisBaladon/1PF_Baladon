import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FilterPipe } from '../../../pipes/filter/filter.pipe';
import { FullNamePipe } from '../../../pipes/users/full-name/full-name.pipe';

const pipes = [
  FilterPipe,
  FullNamePipe,
  DatePipe,
]

@NgModule({
  providers: [ pipes ],
  declarations: [
    FilterPipe,
    FullNamePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [ pipes ],
})
export class PipesModule { }
