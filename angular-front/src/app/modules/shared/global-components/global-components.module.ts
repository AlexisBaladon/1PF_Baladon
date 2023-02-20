import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from 'src/app/components/global/toolbar/toolbar.component';
import { MenuComponent } from 'src/app/components/global/menu/menu.component';
import { ToastComponent } from 'src/app/components/global/toast/toast.component';
import { CardComponent } from 'src/app/components/global/card/card/card.component';
import { BgIconComponent } from 'src/app/components/global/bg-icon/bg-icon.component';
import { SectionHeaderComponent } from 'src/app/components/global/section-header/section-header.component';
import { IconComponent } from 'src/app/components/widget/icon/icon.component';
import { ConfirmModalComponent } from 'src/app/components/global/confirm-modal/confirm-modal.component';
import { Error404Component } from 'src/app/pages/error404/error404.component';
import { MaterialModule } from '../libraries/material.module';
import { DirectivesModule } from '../directives/directives.module';

const components = [
  ToolbarComponent,
  MenuComponent,
  ToastComponent,
  CardComponent,
  BgIconComponent,
  SectionHeaderComponent,
  IconComponent,
  ConfirmModalComponent,
  Error404Component,
]

@NgModule({
  declarations: [ components ],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule,
  ],
  exports: [ components ]
})
export class GlobalComponentsModule { }
