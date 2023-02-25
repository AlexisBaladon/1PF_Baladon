import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { ServicesModule } from './core/services.module';
import { RoutesModule } from './routes.module';
import { DirectivesModule } from './shared/directives.module';
import { GlobalComponentsModule } from './shared/global-components.module';
import { AuthModule } from './feature/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  providers: [ ],
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutesModule,
    ServicesModule,
    GlobalComponentsModule,
    DirectivesModule,
    AuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
