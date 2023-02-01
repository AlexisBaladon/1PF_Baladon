import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CdkTreeModule } from '@angular/cdk/tree';

const usedModules = [
  CdkTreeModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: usedModules,
  exports: usedModules,
})

export class MaterialModule { }
