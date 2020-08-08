import { ClockRoutingModule } from './clock.route';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClockAppComponent } from './clock.app.component';
import { ClockScreenComponent } from './clock-screen/clock-screen.component';
import { ClockService } from './service/clock.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ClockAppComponent,
    ClockScreenComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClockRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ClockService],
  exports: []
})
export class ClockModule {}
