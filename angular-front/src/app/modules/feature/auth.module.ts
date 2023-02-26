import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../shared/directives.module';
import { GlobalComponentsModule } from '../shared/global-components.module';
import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/app/store/auth/auth.effects';

const routes: Routes = [
  { path: '', component: AuthComponent },
]

const components = [
  AuthComponent,
]
@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DirectivesModule,
    GlobalComponentsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [ components ]
})
export class AuthModule { }
