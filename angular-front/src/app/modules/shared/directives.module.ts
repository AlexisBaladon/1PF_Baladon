import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InRangeStyleDirective } from '../../directives/in-range-style/in-range-style.directive';
import { ValidInputDirective } from '../../directives/valid-input/valid-input.directive';
import { FontSizeDirective } from '../../directives/fonts/size/font-size.directive';
import { CustomBackgroundDirective } from '../../directives/custom-background/custom-background.directive';
import { GlobalComponentsModule } from './global-components.module';

const directives = [
  InRangeStyleDirective,
  ValidInputDirective,
  FontSizeDirective,
  CustomBackgroundDirective,
]

@NgModule({
  declarations: [ directives ],
  imports: [
    CommonModule,
  ],
  exports: [ directives ]
})
export class DirectivesModule { }
