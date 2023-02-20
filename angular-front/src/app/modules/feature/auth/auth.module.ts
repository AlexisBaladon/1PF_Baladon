import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '../../shared/directives/directives.module';
import { GlobalComponentsModule } from '../../shared/global-components/global-components.module';
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
  AuthComponent,
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    DirectivesModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
  ],
  exports: [ components ]
})
export class AuthModule { }
